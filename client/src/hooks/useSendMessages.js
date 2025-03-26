import useStore from "../store/store";
import {api} from "../utils/axiosInstance";

const useSendMessages = () => {
  const { selected, setChat, chat, isSelected } = useStore();

  const sendMessage = async (message) => {
    if (!message || !selected?._id) return;

    try {
      const res = await api.post(`/messages/send/${selected._id}`, {
        message,
        isSelected,
      });

      setChat([...chat, res.data]); // Append new message to chat
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error.message);
    }
  };

  return sendMessage;
};

export { useSendMessages };

// // import { useContext } from "react";
// import useStore from "../store/store";
// // import { authContext } from "../context/UserRegister";

// const useSendMessages = () => {
//   // const { onlineUser, socketIo } = useContext(authContext);
//   const { selected, setChat, chat, isSelected } = useStore();

//   const sendMessage = async (message) => {
//     try {
//       const res =
//         message &&
//         (await fetch(
//           `${process.env.REACT_APP_BACKEND_URL}/messages/send/${selected?._id}`,
//           {
//             // (await fetch(`http://localhost:5121/messages/send/${selected?._id}`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//             body: JSON.stringify({
//               message,
//               isSelected,
//             }),
//             // body: JSON.stringify({ message, isUserSelected }),
//           }
//         ));
//       const data = await res.json();
//       if (!res.ok) {
//         throw new Error(data.error);
//         // return;(data)
//       }
//       // setfreshMsg(data);
//       // setfreshMsg([...freshMsg, data]);
//       // console.log(data, "data");
//       // if (data) {
//       //   setChat(chat ? [...chat, data] : [data]);
//       // }
//       setChat([...chat, data]);
//       // setChat();
//       // setIsSelected([]);
//     } catch (error) {
//       console.log(error, "Error from getMessages hook");
//     }
//   };
//   return sendMessage;
//   // }, []);
// };
// export { useSendMessages };
