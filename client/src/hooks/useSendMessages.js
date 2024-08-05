import { useEffect } from "react";
import useStore from "../store/store";

const useSendMessages = () => {
  const { selected, setChat, chat } = useStore();
  // console.log(chat);

  // useEffect(() => {
  const sendMessage = async (message) => {
    try {
      const res =
        message &&
        (await fetch(`http://localhost:5121/messages/send/${selected?._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ message }),
        }));
      const data = await res.json();
      // console.log(data);
      if (!res.ok) {
        throw new Error(data.error);
        // return;
      }
      // console.log(data, "data");
      // if (data) {
      //   setChat(chat ? [...chat, data] : [data]);
      // }
      setChat([...chat, data]);
      // setChat();
    } catch (error) {
      console.log(error, "Error from getMessages hook");
    }
  };
  return sendMessage;
  // }, []);
};
export default useSendMessages;
