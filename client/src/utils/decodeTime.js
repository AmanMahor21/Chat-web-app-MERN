import {
  format,
  compareAsc,
  isValid,
  subWeeks,
  isWithinInterval,
  subDays,
} from "date-fns";
import useStore from "../store/store";

const decodeTime = (createdAt) => {
  // console.log(createdAt);
  //   const timestamp = "2024-07-29T14:54:10.182+00:00";
  const date = new Date(createdAt);

  // Format the time using date-fns
  const formattedTime = format(date, "HH:mm:ss");
  return formattedTime;
  // console.log(formattedTime);
};

const chats = [];
const useLastMessageDate = (chat) => {
  const { allUser } = useStore();
  const lastMessage = new Date(chat[chat.length - 1]?.createdAt);
  const now = new Date();
  const before7Days = subDays(now, 7);

  const result = isWithinInterval(lastMessage, {
    start: before7Days,
    end: now,
  });
  // console.log(allUser, "alluser alluser ");
  if (result) {
    if (isValid(lastMessage)) {
      const lastVisit = allUser.reduce((total, curr, indx) => {
        // if()
        return format(lastMessage, "eee");
      });
      // const lastVisit = allUser.map((ele) => {
      //   return format(lastMessage, "eee");
      // });
      console.log(lastVisit, "lastVisit lastVisit");
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
