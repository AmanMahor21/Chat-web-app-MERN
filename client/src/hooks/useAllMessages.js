import React, { useEffect } from "react";
import useStore from "../store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useAllMessages = () => {
  const { setAllChat } = useStore();

  useEffect(() => {
    const fetchAllChat = async () => {
      try {
        const res = await fetch(`http://localhost:5121/messages`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setAllChat(data);

        console.log(data, "res");
        console.log(data, "res");
      } catch (error) {
        toast.error(error.message || "Failed to get chats", {
          position: "bottom-left",
          autoClose: 2000,
          theme: "colored",
        });
      }
    };
    fetchAllChat();
  }, [setAllChat]);
};

export default useAllMessages;
