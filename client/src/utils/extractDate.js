// import { useEffect } from "react";
// import { format, isWithinInterval, subDays, isValid } from "date-fns";
import useStore from "../store/store";
// import { authContext } from "../context/UserRegister";
import { useContext, useEffect, useState } from "react";
import { authContext } from "../context/UserRegister";
import { format, isToday, isYesterday } from "date-fns";

// const useExtractDate = (user) => {
// const { unseenCount, setAllLast_MsgDay } = useStore();
//   const { formateDate, setFormatDate } = useContext(authContext);
//   // const [formateDate, setFormatDate] = useState([]);
//   // const { socketIo, saveUser } = useContext(authContext);
//   console.log(user);
//   // console.log(formateDate, "formateDate");
//   useEffect(() => {

//     const now = new Date();
//     const before7Days = subDays(now, 7);

//     const formattedDates = unseenCount?.map((ele) => {
//       const lastMsg = ele?.createdAt ? new Date(ele.createdAt) : null;

//       if (!lastMsg || !isValid(lastMsg)) return null;

//       const isInLastWeek = isWithinInterval(lastMsg, {
//         start: before7Days,
//         end: now,
//       });

//       return {
//         ...ele,
//         createdAt: isInLastWeek
//           ? format(lastMsg, "eee")
//           : format(lastMsg, "yyyy/MM/dd"),
//       };
//     });

//     setFormatDate((prev) => formattedDates ?? prev);

//     // console.log(formattedDates, "Formatted Dates within 7 Days and beyond");
//   }, []);

//   return { formateDate, setFormatDate };
// };

export const countUnreadMsg = (user) => {
  // unseenCount.map((ele) => {
  //   const lastMsg = ele?.createdAt ? new Date(ele.createdAt) : null;

  //   return {
  //     ...ele,
  //     createdAt: isInLastWeek
  //       ? format(lastMsg, "eee")
  //       : format(lastMsg, "yyyy/MM/dd"),
  //   };

  //   setFormatDate((prev) => formattedDates ?? prev);
  // });
};

const extractDate = (users) => {
  return users.map((user) => {
    const { lastMessageDay } = user;

    let formattedDay;

    if (!lastMessageDay) {
      // Handle users with no last message
      formattedDay = "";
    } else {
      // Format the existing lastMessageDay
      const messageDate = new Date(lastMessageDay);

      if (isToday(messageDate)) {
        formattedDay = "Today";
      } else if (isYesterday(messageDate)) {
        formattedDay = "Yesterday";
      } else {
        formattedDay = format(messageDate, "MMM d, yyyy");
      }
    }

    return {
      ...user,
      lastMessageDay: formattedDay,
    };
  });
};
export default extractDate;
