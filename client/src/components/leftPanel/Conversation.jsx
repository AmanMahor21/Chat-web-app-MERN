import React, { memo, useContext, useEffect } from "react";
import useStore from "../../store/store";
import { authContext } from "../../context/UserRegister";
import useReadUnseenMsg from "../../hooks/UseReadUnseenMsg";
import useExtractDate from "../../utils/extractDate";
import { format, isValid } from "date-fns";

const Conversation = memo(({ user, idx, ind }) => {
  const { selected, setSelected } = useStore();

  const { onlineUser, socketIo } = useContext(authContext);
  const isOpen = selected && selected._id === user._id;
  const isOnline = onlineUser && onlineUser.includes(user._id);

  const { formateDate, setFormatDate } = useExtractDate(user);
  const tickUnreadMsg = useReadUnseenMsg();

  useEffect(() => {
    const handleUnreadCount = (unreadCount, senderId, createdAt) => {
      if (senderId === selected?._id) {
        tickUnreadMsg(user);
        return;
      }

      setFormatDate((prev = []) => {
        const newData = [...prev];
        const indx = newData.findIndex((ele) => ele._id === senderId);
        const newDate = new Date(createdAt);
        const formatedTo_Day = isValid(newDate) ? format(newDate, "eee") : null;
        if (indx !== -1) {
          newData[indx] = {
            ...newData[indx],
            createdAt: formatedTo_Day,
            unreadCount: unreadCount,
          };
        } else {
          newData.push({
            _id: senderId,
            createdAt: formatedTo_Day,
            unreadCount: unreadCount,
          });
        }
        return newData;
      });
    };

    socketIo.on("unreadCount", handleUnreadCount);

    return () => {
      socketIo.off("unreadCount", handleUnreadCount);
    };
  }, [selected?._id]);

  const handleSelectedUser = async () => {
    setSelected(user);
    sessionStorage.setItem("selectedUser", JSON.stringify(user._id));
    await tickUnreadMsg(user);
  };

  return (
    <div
      key={user._id}
      className={`singleUser ${idx ? "lastDivider" : ""} ${
        isOpen ? "selectedUser" : ""
      }`}
      onClick={handleSelectedUser}
    >
      <div className="avatar-container">
        <img src={user.avatar} alt="User Avatar" className="avatar" />
        <div className={`status ${isOnline ? "active" : "inActive"}`}></div>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-grow-1 ps-2 pe-2">
        <div className="">{user.username}</div>

        <div>{user.messageDay ? `${user.messageDay}` : ""}</div>
        {formateDate?.length > 0 &&
          formateDate?.map((ele, ind) => {
            if (user._id === ele._id) {
              return (
                <div key={ind}>
                  <div className="text-slate-700 text-sm ">
                    {user.messageDay}
                    {/* {ele.createdAt || user.messageDay || ""} */}
                  </div>
                  {ele.unreadCount > 0 && (
                    <div className="rounded-full bg-[#248449] text-sm p-1">
                      {`+ ${ele.unreadCount}`}
                    </div>
                  )}
                </div>
              );
            }
          })}
      </div>
    </div>
  );
});

export default Conversation;
