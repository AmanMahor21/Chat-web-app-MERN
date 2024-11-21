import React, { useContext, useEffect } from "react";
import useStore from "../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValid, format } from "date-fns";
import { authContext } from "../context/UserRegister";
const useAllMessages = (saveUser) => {
  const { setAllChat, allChat, setAllLast_MsgDay } = useStore();
  // const {saveUser} = useContext(authContext)
  // console.log(saveUser._id, "ll");
  useEffect(() => {
    const fetchAllChat = async (setFormatDate) => {
      console.log(saveUser, "ass");
      try {
        // const res = await fetch(
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/messages`,
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
        // setAllChat(data);
        console.log(data, "res");
        const lastMsgDay = data.map((ele) => {
          const newDate = new Date(ele.createdAt);
          const day = isValid(newDate);
          // console.log(ele._id.sender, "nn");
          return {
            _id:
              saveUser._id == ele._id.sender
                ? ele._id.receiver
                : ele._id.sender,
            createdAt: day ? format(newDate, "eee") : null,
            unreadCount: ele.unreadCount || 0,
          };
        });
        console.log(lastMsgDay, "resasdasdas");
        setAllLast_MsgDay(lastMsgDay);
        // return data
        // console.log(data, "res");
      } catch (error) {
        toast.error(error.message || "Failed to get chats", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
        });
      }
    };
    fetchAllChat();
    // return fetchAllChat;
  }, [saveUser]);
};

export default useAllMessages;
