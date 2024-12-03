

import { useEffect } from "react";
import useStore from "../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValid, format } from "date-fns";
// import { authContext } from "../context/UserRegister";
const useAllMessages = (saveUser) => {
  const { setAllLast_MsgDay, setFormatDate } = useStore();
  // const {saveUser} = useContext(authContext)
  // console.log(saveUser._id, "ll");
  // useEffect(() => {
  const fetchAllChat = async (user) => {
    try {
      // const res = await fetch(
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/messages/login-user/${saveUser._id}`,
        {
          // `http://localhost:5121/messages/login-user/${saveUser._id}`,

          method: "GET",
          credentials: "include",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      // console.log(data, "nn");
      // setAllChat(data);
      // console.log(data, "res");

      data.forEach((msg) => {
        const { _id, createdAt, message } = msg;
        const relevantId = _id.sender === user._id ? _id.receiver : _id.sender;
        const formattedDate = isValid(new Date(createdAt))
          ? format(new Date(createdAt), "eee")
          : null;

        setFormatDate((prev = []) => {
          const newData = [...prev];
          const indx = newData.findIndex((ele) => ele._id === relevantId);

          if (indx !== -1) {
            newData[indx] = {
              ...newData[indx],
              createdAt: formattedDate,
              message,
              unreadCount: 0, // Default unreadCount to 0 for now
            };
          } else {
            newData.push({
              _id: relevantId,
              createdAt: formattedDate,
              message,
              unreadCount: 0,
            });
          }

          return newData;
        });
      });
      const lastMsgDay = data.map((ele) => {
        const newDate = new Date(ele.createdAt);
        const day = isValid(newDate);
        return {
          _id:
            saveUser._id === ele._id.sender ? ele._id.receiver : ele._id.sender,
          createdAt: day ? format(newDate, "eee") : null,
          unreadCount: ele.unreadCount || 0,
        };
      });
      // console.log(lastMsgDay, "resasdasdas");
      setAllLast_MsgDay(lastMsgDay);
      return data;
      // console.log(data, "res");
    } catch (error) {
      toast.error(error.message || "Failed to get chats", {
        position: "bottom-left",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };
  // fetchAllChat();
  // return fetchAllChat;
  // }, [saveUser]);
};

export default useAllMessages;
