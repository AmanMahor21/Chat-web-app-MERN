import React, { useContext, useEffect, useRef } from "react";
// import useStore from "../../store/store";
import useGetMessages from "../../hooks/useGetMessages";
import { authContext } from "../../context/UserRegister";
import useStore from "../../store/store";
import { decodeTime, unseenText } from "../../utils/decodeTime";
import useGetTextFromSocket from "../../hooks/useGetTextFromSocket";
import notificationSound from "../../assets/sounds/notification.mp3";
// import useExtractDate from "../../utils/extractDate";
import { format, isValid } from "date-fns";

const ConversationBox = () => {
  const lastMessage = useRef(null);
  const findChatsRef = useRef([]);
  const { selected, searchText, setSearchedMsg, searchedMsg, moveChat } =
    useStore();
  const chat = useGetMessages();
  const { saveUser, onlineUser } = useContext(authContext);

  console.log(chat, "chat chat");
  // const isSameDate = useExtractDate();
  useGetTextFromSocket();
  console.log(selected, "selectd");
  useEffect(() => {
    lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
    const unseenMessage = unseenText(chat, findChatsRef);
    // if (selected._id !== chat[chat.length - 1]._id) {
    // }

    // const endtext = chat[chat?.length - 1];
    // const receiverSound = endtext.receiverID == saveUser._id;
    // const receiverSound = onlineUser?.includes(endtext?.receiverID);
  }, [chat]);
  const formatDate = (chatDate) => {
    const parsedDate = new Date(chatDate);
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd/MMM/yyyy");
    }
  };
  useEffect(() => {
    if (searchText !== "" && searchText !== null) {
      const chatIndex = chat?.reduce((total, curr, step) => {
        if (curr.message.toLowerCase().includes(searchText.toLowerCase())) {
          return [...total, step];
        }

        return total;
      }, []);
      setSearchedMsg(chatIndex);
    } else {
      setSearchedMsg([]);
    }
  }, [searchText]);

  useEffect(() => {
    if (searchedMsg?.length > 0) {
      console.log(moveChat);
      // searchedMsg?.map((_, roll) => {
      findChatsRef?.current[searchedMsg[moveChat]].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
      // var highLight = msgFind ? "highlight" : "";
      // });
    }
    // return () => {
    //   findChatsRef.current = [];
    // };
  }, [searchedMsg, moveChat]);

  console.log(searchedMsg, "searchedMsg searchedMsg");
  // console.log(findChatsRef, "ref refref");
  // console.log(searchText, "search text");
  // const findChat = chat.filter((ele) =>
  //   ele.message.toLowerCase().includes(searchText?.toLowerCase())
  // );
  // if (findChat) {
  // }
  // console.log(findChat, "findChat");
  return (
    <div className="w-100 ConversationBox ">
      {!chat || chat.length === 0 ? (
        <div className="noMessage">
          send a message to start the conversation
        </div>
      ) : (
        <>
          {/* {trackDate.current !== date && <div>{date}</div>} */}

          {chat?.map((msg, ind) => {
            const messageTurn = msg.senderID === saveUser._id;
            const enableSender = messageTurn ? "right" : "bubble left  ";
            const enableSenderWrap = messageTurn
              ? "chat_wrapper"
              : "receiver_wrap";

            // const textShake = msg.senderID !== saveUser._id;
            const textShake = chat.length - 1 == ind;
            // console.log(chat.length - 1, "length");
            // console.log(ind, "ind");
            // console.log(textShake, "sjaketurn");
            const shakeTurn = textShake ? "shakeMsg" : "";
            // console.log(shakeTurn, "sjaketurn
            const currDate = formatDate(msg?.createdAt);
            const prevDate = ind > 0 && formatDate(chat[ind - 1].createdAt);

            // const findChat = chat.filter((ele) =>
            // const findChat = msg.message
            //   .toLowerCase()
            //   .includes(searchText?.toLowerCase());
            // if (msg.message.toLowerCase() === searchText?.toLowerCase()) {
            //   msg?.message?.scrollIntoView({ behavior: "smooth" });
            // }

            // console.log(findChat, "findChat findChat");
            // );
            return (
              <>
                {prevDate !== currDate && (
                  <div className="date-separator">{currDate}</div>
                )}
                <div
                  className={`${enableSenderWrap} ${
                    ind == searchedMsg[moveChat] ? "highlight" : ""
                  } `}
                  key={ind}
                >
                  {/* {currDate !== prevDate && <div>{currDate}</div>} */}
                  <div
                    className={`${enableSender} ${shakeTurn} `}
                    // className={`${enableSender} ${shakeTurn} ${highLight}`}
                    // ref={ind == searchedMsg ? findChatsRef : null}
                    ref={(el) => (findChatsRef.current[ind] = el)}
                  >
                    {msg.message}

                    <div className="time">{decodeTime(msg.createdAt)}</div>
                  </div>
                </div>
                <div ref={ind === chat?.length - 1 ? lastMessage : null}></div>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ConversationBox;

// import React, { useContext, useEffect, useRef } from "react";
// import useGetMessages from "../../hooks/useGetMessages";
// import { authContext } from "../../context/UserRegister";
// import useStore from "../../store/store";
// import decodeTime from "../../utils/decodeTime";
// import useGetTextFromSocket from "../../hooks/useGetTextFromSocket";

// const ConversationBox = () => {
//   const lastMessage = useRef(null);
//   const { setChat, date, selected } = useStore();
//   const chat = useGetMessages();
//   const { saveUser, onlineUser } = useContext(authContext);

//   console.log(selected, "online user");

//   useGetTextFromSocket();

//   useEffect(() => {
//     lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   return (
//     <div className="w-100 ConversationBox">
//       {!chat || chat.length === 0 ? (
//         <div className="noMessage">
//           Send a message to start the conversation
//         </div>
//       ) : (
//         <>
//           <div>{date}</div>
//           {chat.map((msg, ind) => {
//             const messageTurn = msg.senderID === saveUser._id;
//             const enableSender = messageTurn ? "right" : "bubble left";
//             const enableSenderWrap = messageTurn
//               ? "chat_wrapper"
//               : "receiver_wrap";

//             const textShake = msg.senderID !== saveUser._id;
//             const shakeTurn = textShake ? "shakeMsg" : "";
//             return (
//               <div className={`${enableSenderWrap}`} key={ind}>
//                 <div
//                   className={`${enableSender} ${shakeTurn}`}
//                   ref={ind === chat.length - 1 ? lastMessage : null}
//                 >
//                   {msg.message}
//                   <div className="time">{decodeTime(msg.createdAt)}</div>
//                 </div>
//               </div>
//             );
//           })}
//         </>
//       )}
//     </div>
//   );
// };

// export default ConversationBox;
