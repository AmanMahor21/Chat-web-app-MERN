import React, { useEffect } from "react";
import useStore from "../store/store";

const useGetMessages = () => {
  const { selected, setChat, chat, } = useStore();
  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await fetch(
          `http://localhost:5121/messages/${selected._id}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        console.log(data, "getMessages");
        if (!res.ok) {
          throw new Error(data.error);
        }
        setChat(data);
      } catch (error) {
        console.log(error, "Error from getMessages hook");
      }
    };
    getMessage();
  }, [selected?._id, setChat]);
  return chat;
};

export default useGetMessages;
