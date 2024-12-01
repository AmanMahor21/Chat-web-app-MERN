import React, { memo, useContext, useEffect, useRef } from "react";
import useStore from "../../store/store";
import { authContext } from "../../context/UserRegister";
import useReadUnseenMsg from "../../hooks/UseReadUnseenMsg";
// import useExtractDate from "../../utils/extractDate";
import { format, isValid } from "date-fns";
import useAllMessages from "../../hooks/useAllMessages";

const Conversation = ({ user, idx, ind }) => {
  const { selected, setSelected, chat, unseenCount } =
    // const { selected, setSelected, chat, formateDate, setFormatDate } =
    useStore();
  const selectedUSer = useRef(selected);
  // console.log(unseenCount, "unseenCount");
  const { onlineUser, socketIo, saveUser, formateDate, setFormatDate } =
    useContext(authContext);
  const isOpen = selected && selected._id === user._id;
  const isOnline = onlineUser && onlineUser.includes(user._id);

  // console.log(formateDate, "formateDate");
  //  useExtractDate(user);
  const tickUnreadMsg = useReadUnseenMsg();
  // console.log(formateDate);
  useAllMessages(saveUser);
  // useEffect(() => {
  // fetchAllChat(user);
  // }, [user]);
  useEffect(() => {
    selectedUSer.current = selected;
  }, [selected]);

  const handleUnreadCount = (unreadCount, senderId, createdAt) => {
    // console.log(unreadCount, "unreadCount");
    if (senderId == selectedUSer?.current?._id && unreadCount > 0) {
      tickUnreadMsg(user);
      return;
    }

    setFormatDate((prev = []) => {
      const newData = [...prev];
      const indx = newData.findIndex((ele) => ele._id === senderId);
      const newDate = new Date(createdAt);
      const formattedToDay = isValid(newDate) ? format(newDate, "eee") : null;

      if (indx !== -1) {
        newData[indx] = {
          ...newData[indx],
          createdAt: formattedToDay,
          unreadCount: unreadCount,
          // unreadCount: unseenCount.length > 0   || unreadCount,
        };
      } else {
        newData.push({
          _id: senderId,
          createdAt: formattedToDay,
          unreadCount: unreadCount,
          // unreadCount: unseenCount || unreadCount,
        });
      }
      return newData;
    });
  };

  useEffect(() => {
    socketIo.on("unreadCount", handleUnreadCount);

    return () => {
      socketIo.off("unreadCount", handleUnreadCount);
    };
  }, [socketIo]);

  const handleSelectedUser = async () => {
    setSelected(user);
    sessionStorage.setItem("selectedUser", JSON.stringify(user._id));
    await tickUnreadMsg(user);
  };
  console.log(user, "user");
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

        {/* {formateDate?.length > 0 && */}
        <div>
          <div>{user.lastMessageDay}</div>
          {formateDate?.map((ele, ind) => {
            if (user._id === ele._id) {
              return (
                <div key={ind}>
                  {/* <div className="text-slate-700 text-sm "> */}
                  {/* {user.messageDay} */}
                  {/* {ele.createdAt || user.messageDay || ""} */}
                  {/* </div> */}
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
    </div>
  );
};

export default Conversation;
