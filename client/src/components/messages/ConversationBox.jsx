import React, { useContext, useEffect, useRef } from "react";
// import useStore from "../../store/store";
import useGetMessages from "../../hooks/useGetMessages";
import { authContext } from "../../context/UserRegister";
import useStore from "../../store/store";
import { decodeTime } from "../../utils/decodeTime";
import useGetTextFromSocket from "../../hooks/useGetTextFromSocket";
// import notificationSound from "../../assets/sounds/notification.mp3";
// import useExtractDate from "../../utils/extractDate";
import Swal from "sweetalert2";
import { format, isValid } from "date-fns";
import useAllMessages from "../../hooks/useAllMessages";
import { useNavigate } from "react-router-dom";

const ConversationBox = () => {
  const lastMessage = useRef(null);
  const findChatsRef = useRef([]);
  const { saveUser, setSaveUser, formateDate } = useContext(authContext);
  const {
    searchText,
    setSearchedMsg,
    searchedMsg,
    moveChat,
    selected,
    setSearchText,
  } = useStore();
  const chat = useGetMessages();

  const navigate = useNavigate();

  // useAllMessages(saveUser);

  //automatically logout when session cookie expire
  useEffect(() => {
    const sessionExpiry = localStorage.getItem("sessionExpiry");
    const currentTime = new Date().getTime(); // Get the current time in milliseconds
    if (sessionExpiry && currentTime >= sessionExpiry) {
      // return true; // Session is valid
      localStorage.removeItem("userData");
      localStorage.removeItem("sessionExpiry");
      setSaveUser("");
      navigate("/login");
    }
  }, [chat?.length, selected, formateDate]);
  useGetTextFromSocket();

  // automatically scoll to the last message
  useEffect(() => {
    lastMessage?.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Handle to group message by date in conversation.
  const formatDate = (chatDate) => {
    const parsedDate = new Date(chatDate);
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd/MMM/yyyy");
    }
  };

  // Finding the matching searched text in a conversation
  useEffect(() => {
    if (searchText !== "" && searchText !== null) {
      const chatIndex = chat?.reduce((total, curr, step) => {
        if (curr.message.toLowerCase().includes(searchText.toLowerCase())) {
          return [...total, step];
        }

        return total;
      }, []);
      setSearchedMsg(chatIndex);
      // setSearchText("");
    } else {
      setSearchedMsg([]);
    }
  }, [searchText]);

  console.log(searchedMsg, searchText, "search");
  // Automatically scroll to the searched the message in a Conversation
  useEffect(() => {
    if (searchedMsg.length > 0) {
      findChatsRef?.current[searchedMsg[moveChat]].scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [searchedMsg, moveChat]);

  return (
    <div className="w-100 ConversationBox ">
      {!chat || chat.length === 0 ? (
        <div className="noMessage">
          send a message to start the conversation
        </div>
      ) : (
        <>
          {chat?.map((msg, ind) => {
            const messageTurn = msg.senderID === saveUser._id;
            const enableSender = messageTurn ? "right" : "bubble left";
            const enableSenderWrap = messageTurn
              ? "chat_wrapper"
              : "receiver_wrap";
            const textShake = chat.length - 1 === ind;
            const shakeTurn = textShake ? "shakeMsg" : "";
            const currDate = formatDate(msg?.createdAt);
            const prevDate = ind > 0 && formatDate(chat[ind - 1].createdAt);

            return (
              <>
                {prevDate !== currDate && (
                  <div className="date-separator">{currDate}</div>
                )}
                <div
                  className={`${enableSenderWrap} ${
                    ind === searchedMsg[moveChat] ? "highlight" : ""
                  } `}
                  key={ind}
                >
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
