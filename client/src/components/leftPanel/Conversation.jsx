import React, { useContext, useEffect } from "react";
import useStore from "../../store/store";
import { authContext } from "../../context/UserRegister";
import { useLastMessageDate, unseenText } from "../../utils/decodeTime";

// import useGetTextFromSocket from "../../hooks/useGetTextFromSocket";
// import selectedUser from "../../context/UserRegister";
// import uesGetTextFromSocket from
const Conversation = ({ user, idx, ind }) => {
  const { selected, setSelected, chat } = useStore();
  // console.log(user, "single user");
  const { onlineUser } = useContext(authContext);
  // useGetTextFromSocket();
  const isSelected = selected && selected._id === user._id;
  // console.log(onlineUser, "onlineUser");
  // console.log(user._id, "userid");
  const isOnline = onlineUser && onlineUser.includes(user._id);

  useEffect(() => {
  }, []);
  const lastDate = useLastMessageDate(chat);
  const unseenMsg = unseenText(chat);
  console.log(lastDate, "lastDate lastDate");
  return (
    <div
      key={ind}
      className={`singleUser ${idx ? "lastDivider" : ""} ${
        isSelected ? "selectedUser" : ""
      }`}
      onClick={() => setSelected(user)}
    >
      {/* <img className="userProfile" src={user.avatar} alt="" srcset="" /> */}
      <div className="avatar-container">
        <img src={user.avatar} alt="User Avatar" className="avatar" />
        <div className={`status ${isOnline ? "active" : "inActive"}`}></div>
      </div>
      <div className="d-flex justify-content-between align-items-center flex-grow-1 ps-2 pe-2">
        <div className="">{user.username}</div>
        <div>{lastDate}</div>
      </div>
    </div>
  );
};

export default Conversation;
