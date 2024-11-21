// import { useContext } from "react";
import useStore from "../store/store";
// import { authContext } from "../context/UserRegister";

const useSendMessages = () => {
  // const { onlineUser, socketIo } = useContext(authContext);
  const { selected, setChat, chat, isSelected } = useStore();

  const sendMessage = async (message) => {
    try {
      const res =
        message &&
        (await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/messages/send/${selected?._id}`,
          {
            // (await fetch(`http://localhost:5121/messages/send/${selected?._id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              message,
              isSelected,
            }),
            // body: JSON.stringify({ message, isUserSelected }),
          }
        ));
      const data = await res.json();
      // console.log(data);
      if (!res.ok) {
        throw new Error(data.error);
        // return;(data)
      }
      // setfreshMsg(data);
      // setfreshMsg([...freshMsg, data]);
      // console.log(data, "data");
      // if (data) {
      //   setChat(chat ? [...chat, data] : [data]);
      // }
      setChat([...chat, data]);
      // setChat();
      // setIsSelected([]);
    } catch (error) {
      console.log(error, "Error from getMessages hook");
    }
  };
  return sendMessage;
  // }, []);
};
export { useSendMessages };
