import React, { useContext, useEffect } from "react";
import { format, isWithinInterval, subDays, isValid } from "date-fns";
import useStore from "../store/store";
import { authContext } from "../context/UserRegister";
import { useState } from "react";

const useExtractDate = (user) => {
  const { date, chat, unseenCount, setUnseenCount } = useStore();
  const [formateDate, setFormatDate] = useState([]);
  const { socketIo, saveUser } = useContext(authContext);

  // console.log(formateDate, "formateDate");
  useEffect(() => {
    const now = new Date();
    const before7Days = subDays(now, 7);

    const formattedDates = unseenCount?.map((ele) => {
      const lastMsg = ele?.createdAt ? new Date(ele.createdAt) : null;

      if (!lastMsg || !isValid(lastMsg)) return null;

      const isInLastWeek = isWithinInterval(lastMsg, {
        start: before7Days,
        end: now,
      });

      return {
        ...ele,
        createdAt: isInLastWeek
          ? format(lastMsg, "eee")
          : format(lastMsg, "yyyy/MM/dd"),
      };
    });

    setFormatDate((prev) => formattedDates ?? prev);

    // console.log(formattedDates, "Formatted Dates within 7 Days and beyond");
  }, []);

  return { formateDate, setFormatDate };
};

export default useExtractDate;
