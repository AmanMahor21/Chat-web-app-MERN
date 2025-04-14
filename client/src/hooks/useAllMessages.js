

import { useEffect } from "react";
import useStore from "../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isValid, format } from "date-fns";
import { api } from "../utils/axiosInstance";

const useAllMessages = (saveUser) => {
  const { setAllLast_MsgDay, setFormatDate } = useStore();
  console.log(saveUser, "userrrrrrr");
  const fetchAllChat = async (user) => {
    try {
      console.log("Fetching chat started");
      const res = await api.get(`/messages/login-user/${saveUser._id}`);
      console.log("API Response:", res);
    } catch (error) {
      console.error("Error in fetchAllChat:", error);
    }
    try {
      // Send GET request using Axios
      const res = await api.get(`/messages/login-user/${saveUser._id}`);

      const data = res.data; // Axios automatically parses JSON
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
          _id: saveUser._id === ele._id.sender ? ele._id.receiver : ele._id.sender,
          createdAt: day ? format(newDate, "eee") : null,
          unreadCount: ele.unreadCount || 0,
        };
      });

      setAllLast_MsgDay(lastMsgDay);
      return data;
    } catch (error) {
      toast.error(error.message || "Failed to get chats", {
        position: "bottom-left",
        autoClose: 2000,
        theme: "colored",
      });
    }
  };

  return fetchAllChat;
};

export default useAllMessages;
