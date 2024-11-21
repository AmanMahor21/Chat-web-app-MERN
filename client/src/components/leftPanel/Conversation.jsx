import React, { memo, useContext, useEffect, useState } from "react";
import useStore from "../../store/store";
import { authContext } from "../../context/UserRegister";
import { useLastMessageDate, unseenText } from "../../utils/decodeTime";
import useReadUnseenMsg from "../../hooks/UseReadUnseenMsg";
import useExtractDate from "../../utils/extractDate";
import { format, isWithinInterval, subDays, isValid } from "date-fns";
import useAllMessages from "../../hooks/useAllMessages";

const Conversation = memo(({ user, idx, ind }) => {
  const {
    selected,
    setSelected,
    chat,
    isSelected,
    unseenCount,
    setUnseenCount,
    setIsSelected,
  } = useStore();

  const { onlineUser, socketIo } = useContext(authContext);
  const isOpen = selected && selected._id === user._id;
  const isOnline = onlineUser && onlineUser.includes(user._id);

  const { formateDate, setFormatDate } = useExtractDate(user);
  const tickUnreadMsg = useReadUnseenMsg();
  console.log(formateDate, "3333");
  // useAllMessages(setFormatDate);
  // fetchAllChat(setFormatDate);
  console.log(selected);
  // useEffect(() => {
  //   if (chat[0]?.senderID == selected?._id) {
  //     console.log("pppppp");
  //     tickUnreadMsg(user);
  //   }
  // }, [chat]);
  useEffect(() => {
    const handleUnreadCount = async (unreadCount, senderId, createdAt) => {
      console.log(unreadCount, "ss");
      console.log(createdAt, "ss");
      console.log(senderId, "ss66666666666666666666666666666", typeof senderId);
      
      if (senderId == selected?._id) {
        console.log(selected, "3333ss");
        tickUnreadMsg(user);
        return;
      }

      setFormatDate((prev = []) => {
        const newData = [...prev];
        console.log(newData, "ssas");
        const indx = newData.findIndex((ele) => ele._id == senderId);
        const newDate = new Date(createdAt);
        const formatedTo_Day = isValid(newDate) ? format(newDate, "eee") : null;
        // if (isValid(newDate)) {
        console.log(indx, "indd");
        // const formatedTo_Day = format(new Date(createdAt), "eee");
        if (indx != -1) {
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
        // } else {
        //   newData[indx] = {
        //     ...newData[indx],
        //     unreadCount: unreadCount,
        //   };
        // }
        return newData;
      });
    };

    socketIo.on("unreadCount", handleUnreadCount);

    return () => {
      socketIo.off("unreadCount", handleUnreadCount);
    };
  }, [selected?._id]);
  // console.log(formateDate, "33");

  const handleSelectedUser = async () => {
    console.log("sdsd");
    setSelected(user);
    sessionStorage.setItem("selectedUser", JSON.stringify(user._id));
    await tickUnreadMsg(user);
    // setUnseenCount({});
  };

  console.log(isSelected, "isSelected");
  return (
    <div
      key={ind}
      className={`singleUser ${idx ? "lastDivider" : ""} ${
        isOpen ? "selectedUser" : ""
      }`}
      onClick={handleSelectedUser}
      // onClick={() => handleSelectedUser(user)}
    >
      {/* <img className="userProfile" src={user.avatar} alt="" srcset="" /> */}
      <div className="avatar-container">
        <img src={user.avatar} alt="User Avatar" className="avatar" />
        <div className={`status ${isOnline ? "active" : "inActive"}`}></div>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-grow-1 ps-2 pe-2">
        <div className="">{user.username}</div>

        <div>{user.messageDay ? `${user.messageDay}` : ""}</div>
        {formateDate &&
          formateDate?.map((ele, ind) => {
            console.log(ele.createdAt, "9999");
            if (user._id == ele._id) {
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
