import React, { memo, useContext, useEffect, useRef, useState } from "react";
import useStore from "../../store/store";
import { authContext } from "../../context/UserRegister";
import useReadUnseenMsg from "../../hooks/UseReadUnseenMsg";
// import useExtractDate from "../../utils/extractDate";
import { format, isValid } from "date-fns";
import useAllMessages from "../../hooks/useAllMessages";
import Skeleton from "../loader/Skeleton";

const Conversation = ({ user, idx, ind }) => {
  const [highLightUnreadMsg, setHighLightUnreadMsg] = useState(false);

  const { selected, setSelected, chat, unseenCount } =
    // const { selected, setSelected, chat, formateDate, setFormatDate } =
    useStore();
  const selectedUSer = useRef(selected);
  const { onlineUser, socketIo, saveUser, formateDate, setFormatDate, loader } =
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
    console.log(unreadCount, "unreadCount");
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

  console.log(formateDate);

  useEffect(() => {
    const hasUnread = formateDate.some(
      (ele) => ele._id === user._id && ele.unreadCount > 0
    );
    setHighLightUnreadMsg(hasUnread);
  }, [formateDate]);

  return (
    <div className=" relative">
      <div
        key={user._id}
        className={`singleUser hover:bg-cyan-900  ${idx ? "lastDivider" : ""} ${
          isOpen ? "selectedUser" : ""
        } `}
        onClick={handleSelectedUser}
      >
        <div className="avatar-container">
          <img src={user.avatar} alt="User Avatar" className="avatar" />
          <div className={`status ${isOnline ? "active" : "inActive"}`}></div>
        </div>
        <div className="d-flex justify-content-between align-items-center flex-1 ps-3 pe-2 py-[6px]">
          <div className="h-full flex flex-col justify-between items-start">
            <div className="font-medium text-start">{user.username}</div>
            <div
              className={`text-sm truncate text-start max-w-[160px] md:max-w-[200px] lg:max-w-[275px] ${
                highLightUnreadMsg ? "text-lime-500" : "text-gray-400"
              }`}
            >
              {user.content}
            </div>
          </div>

          <div className="h-full flex flex-col justify-between items-center">
            <div className="text-sm">{user.lastMessageDay}</div>
            {formateDate?.map((ele, ind) => {
              if (user._id === ele._id) {
                return (
                  <div key={ind} className="flex justify-end w-full">
                    {ele.unreadCount > 0 && (
                      <div className="flex items-center justify-center rounded-full bg-[#248449] text-white text-sm w-6 h-6">
                        {ele.unreadCount}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
