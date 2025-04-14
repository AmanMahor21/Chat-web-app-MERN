import { useEffect } from "react";
import useStore from "../store/store";
import {api} from "../utils/axiosInstance"; // Import Axios instance

const useGetMessages = () => {
  const { selected, setChat, chat } = useStore();

  useEffect(() => {
    const getMessage = async () => {
      if (!selected) return; // Exit if no chat is selected

      try {
        const res = await api.get(`/messages/${selected._id}`); // Axios handles credentials automatically

        setChat(res.data); // Store messages in state
      } catch (error) {
        console.error("Error fetching messages:", error.response?.data || error.message);
      }
    };

    getMessage();
  }, [selected, setChat]);

  return chat;
};

export default useGetMessages;


// import { useEffect } from "react";
// import useStore from "../store/store";

// const useGetMessages = () => {
//   const { selected, setChat, chat } = useStore();
//   // console.log(chat, "chat");
//   useEffect(() => {
//     const getMessage = async () => {
//       if (!selected) return;
//       try {
//         const res = await fetch(
//           `${process.env.REACT_APP_BACKEND_URL}/messages/${selected._id}`,
//           // `http://localhost:5121/messages/${selected?._id}`,
//           {
//             method: "GET",
//             credentials: "include",
//           }
//         );
//         const data = await res.json();
//         // console.log(data, "getMessages");
//         if (!res.ok) {
//           throw new Error(data.error);
//         }

//         setChat(data);
//       } catch (error) {
//         console.log(error, "Error from getMessages hook");
//       }
//     };

//     getMessage();
//   }, [selected, setChat]);
//   return chat;
// };

// export default useGetMessages;
