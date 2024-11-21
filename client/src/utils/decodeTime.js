import { format } from "date-fns";
import useStore from "../store/store";
import { authContext } from "../context/UserRegister";

//Time at which the message received
const decodeTime = (createdAt) => {
  const date = new Date(createdAt);
  const formattedTime = format(date, "HH:mm");
  return formattedTime;
};

// const

export { decodeTime };

// const useLastMessageDate = (getMsg, chat, allUser) => {
// const useLastMessageDate = (chat, user) => {
//   const { socketIo, saveUser } = useContext(authContext);
//   const [reloadMsg, setReloadMsg] = useState([]);
//   const { allChat, freshMsg, selected, unseenCount, setIsSelected } =
//     useStore();
//   const [newMessages, setNewMessages] = useState([]);
//   const [openUser, setOpenUser] = useState("");

//   const { onlineUser } = useContext(authContext);

//   const removeUnseenMsg = newMessages?.sender == selected?._id;
//   const updateUser = freshMsg.filter((ele) => {
//     return ele.receiverID == user._id;
//   });
//   console.log(newMessages, "new");
//   const lastGossip = freshMsg[freshMsg.length - 1];
//   let newMsg = reloadMsg[0]?.freshMsg;
//   useEffect(() => {
//     //.log(selected, "selected");
//     socketIo.emit("selectedUser", {
//       sender: saveUser?._id,
//       selectedUser: selected?._id,
//     });
//     socketIo.on("sendUser", (data) => {
//       setOpenUser(data);
//       setIsSelected(data);
//     });

//     return () => {
//       socketIo.off("sendUser");
//       // setOpenUser(null);
//     };
//   }, [selected?._id]);
//   // }, [reloadMsg[0]?.freshMsg, selected?._id]);
//   // useEff
//   useEffect(() => {
//     if (updateUser.length > 0 && freshMsg.length > 0) {
//       const removePrevMsg = updateUser.slice(newMessages?.retainIndx);

//       setNewMessages((prev = []) => {
//         // Finding the conversation index based on sender and receiver IDs
//         const existingConversationIndex = prev.findIndex(
//           (conv) =>
//             conv.senderID === lastGossip.senderID &&
//             conv.receiverID === lastGossip.receiverID
//         );

//         if (existingConversationIndex !== -1) {
//           // Update the existing conversation
//           const updatedMessages = [...prev];
//           const conversation = updatedMessages[existingConversationIndex];
//           if (
//             lastGossip.createdAt !==
//             conversation?.message[conversation?.message?.length - 1]?.time
//           ) {
//             conversation.message.push({
//               msg: lastGossip.message,
//               time: lastGossip.createdAt,
//             });
//             conversation.display = conversation.message.length;
//             conversation.createdAt = lastGossip.createdAt;
//           }

//           return updatedMessages;
//         } else {
//           return [
//             ...prev,
//             {
//               senderID: lastGossip.senderID,
//               receiverID: lastGossip.receiverID,
//               createdAt: lastGossip.createdAt,
//               display: null,
//               message: [
//                 { msg: lastGossip.message, time: lastGossip.createdAt },
//               ],
//             },
//           ];
//         }
//       });
//       // if(newMessages.senderID == user._id){

//       // }
//     }
//   }, [freshMsg, openUser]);

//   useEffect(() => {
//     const indx = reloadMsg?.findIndex((ele) => ele?.sender === selected?._id);
//     const rawMsgIndx = newMessages.findIndex((ele) => {
//       return ele.receiverID === openUser?.sender;
//     });

//     // if (openUser) {
//     if (openUser) {
//       setNewMessages((prev) => {
//         return prev.map((ele, ind) => {
//           if (ind == rawMsgIndx) {
//             return {
//               ...ele,
//               display: null,
//               message: [],
//             };
//           } else {
//             return ele;
//           }
//         });
//       });
//       setOpenUser(null);
//     }
//     // }, []);
//   }, [openUser]);

//   useEffect(() => {
//     newMessages.forEach((ele) => {
//       const lastMsg = ele?.message
//         ? ele?.message[ele?.message?.length - 1]
//         : "";
//       const currTime = lastMsg?.time
//         ? new Date(lastMsg?.time)
//         : new Date(ele?.createdAt);
//       socketIo.emit("sendLastMsgInfo", {
//         receiver: ele?.receiverID,
//         sender: saveUser._id,
//         freshMsg: lastMsg?.msg,
//         // freshMsg: updateUser[updateUser.length - 1],
//         date: isValid(currTime) ? format(currTime, "eee") : null,
//         unseenMsg: ele?.display,
//       });
//     });
//   }, [newMessages]);
//   const handleRcvLastMessage = (data) => {
//     setReloadMsg((prev = []) => {
//       const indx = prev.findIndex((ind) => ind.sender === data.data.sender);

//       if (indx !== -1) {
//         // Update the existing message for that sender
//         const newData = [...prev];
//         newData[indx] = data.data;
//         return newData;
//       } else {
//         // Add the new message to the list
//         return [...prev, data.data];
//       }
//     });
//   };

//   // Place useEffect at the top level
//   useEffect(() => {
//     socketIo.on("rcvLastMessage", handleRcvLastMessage);

//     return () => {
//       socketIo.off("rcvLastMessage");
//     };
//   }, [socketIo, newMessages]);

//   // console.log(allChat);
//   const collectMsg = allChat.reduce((total, ele) => {
//     const groupedMsg = total?.findIndex((msg) => {
//       return msg.senderID == ele.senderID && msg.receiverID == ele.receiverID;
//     });
//     if (groupedMsg == -1) {
//       return [
//         ...total,
//         {
//           senderID: ele.senderID,
//           receiverID: ele.receiverID,
//           message: [{ gossip: ele.message, createdAt: ele.createdAt }],
//         },
//       ];
//     } else {
//       const newTotal = [...total];
//       newTotal[groupedMsg].message.push({
//         gossip: ele.message,
//         createdAt: ele.createdAt,
//       });
//       return newTotal;
//     }
//   }, []);

//   const lastTime = (endMsg) => {
//     const lastMessage = new Date(endMsg);
//     const now = new Date();
//     const before7Days = subDays(now, 7);

//     const result = isWithinInterval(lastMessage, {
//       start: before7Days,
//       end: now,
//     });
//     return { result, lastMessage };
//   };
//   // console.log(collectMsg, "coll");
//   const selectedUser = collectMsg.find((man) => man.receiverID == user._id);
//   if (selectedUser) {
//     let endMsg =
//       selectedUser.message[selectedUser.message.length - 1].createdAt;

//     if (updateUser.length > 0) {
//       endMsg = updateUser[updateUser?.length - 1]?.createdAt;
//       // endMsg = freshMsg.createdAt;
//     }
//     const { result, lastMessage } = lastTime(endMsg);

//     // console.log(result, "result result");

//     // if (result && isValid(lastMessage)) {
//     // if (result && isValid(lastMessage)) {
//     // console.log("helleo");
//     const mappedMsg = reloadMsg.map((ele) => {
//       // console.log(ele);
//       return {
//         sender: ele?.sender,
//         freshMsg: ele?.freshMsg,
//         date: ele?.date,
//         unseenMsg: ele?.unseenMsg,
//       };
//       // return {
//       //   sender: reloadMsg?.data?.sender,
//       //   freshMsg: reloadMsg?.data?.freshMsg,
//       //   date: reloadMsg?.data?.date,
//       //   unseenMsg: reloadMsg?.data?.unseenMsg,
//       // };
//     });
//     return mappedMsg;
//     // return { date: format(lastMessage, "eee"), display: updateUser.length };
//     // }

//     if (isValid(lastMessage)) {
//       return format(lastMessage, "dd/MMM/yyyy");
//     }
//   }
//   return { date: "", unseenMsg: 0, sender: null };
// };
// // };
// // const unseenText = (chat, chatRef) => {};

// export { decodeTime, useLastMessageDate };
// // export { decodeTime, useLastMessageDate, unseenText };
