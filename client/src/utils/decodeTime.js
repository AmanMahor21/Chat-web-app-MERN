import {
  format,
  compareAsc,
  isValid,
  subWeeks,
  isWithinInterval,
  subDays,
} from "date-fns";
import useStore from "../store/store";
import { useContext, useEffect } from "react";
import { authContext } from "../context/UserRegister";
import useGetMessages from "../hooks/useGetMessages";

const decodeTime = (createdAt) => {
  // console.log(createdAt);
  //   const timestamp = "2024-07-29T14:54:10.182+00:00";
  const date = new Date(createdAt);

  // Format the time using date-fns
  const formattedTime = format(date, "HH:mm:ss");
  return formattedTime;
  // console.log(formattedTime);
};

const useLastMessageDate = (chat, user) => {
  const { allUser, allChat, setSelected } = useStore();
  const { saveUser } = useContext(authContext);
  console.log(user, "user");
  const lastMessage = new Date(chat[chat.length - 1]?.createdAt);
  const now = new Date();
  const before7Days = subDays(now, 7);

  console.log(allChat, "lastVisit lastVisit");
  const result = isWithinInterval(lastMessage, {
    start: before7Days,
    end: now,
  });
  // console.log(allUser, "alluser alluser ");
  const ary = [];
  useEffect(() => {
  // const stop = async () => {
  allUser.forEach((ele, ind) => {
    setSelected(ele);
    //  const chat = useGetMessages()
    //  await  ary.push(chat);
    console.log(chat, "chat");
    return () => {
      setSelected(null);
    };
  });
  // };
  }, []);
  console.log(ary, "ary");
  if (allChat.length > 0 && saveUser && allUser.length > 0) {
    const filterMsg = allChat.filter((ele, ind) => {
      if (ele.senderID == saveUser._id && user._id === ele.receiverID) {
        return ele;
      }
      if (ele.senderID == user._id && ele.receiverID == saveUser._id) {
        return ele;
      }
    // (ele.senderID == user._id && ele.receiverID == saveUser.id)
    // return ele.senderID == saveUser._id  && ele.receiverID == saveUser._id
    });
    // console.log(filterMsg, "asd545asd4 64 654s d65sa4 54 a65s4 654 ");
  }
  if (result) {
    if (isValid(lastMessage)) {
      return format(lastMessage, "eee");
    }
  }

  if (isValid(lastMessage)) {
    return format(lastMessage, "dd/MMM/yyyy");
  }
};

const unseenText = (chat, chatRef) => {
  // console.log(chatRef, "chatref");
  // console.log(chat, "chat");
};

export { decodeTime, useLastMessageDate, unseenText };
