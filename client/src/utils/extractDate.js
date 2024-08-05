// import React from "react";
// import { format } from "date-fns";
// import useStore from "../store/store";

// const useExtractDate = () => {
//   const { date, chat } = useStore();
//   if (chat && chat.length > 0) {
//     const findDate = chat[chat.length - 1].createdAt.slice(0, 10);
//     const check = format(new Date(findDate), "dd/MMM/yyyy");
//     const chatDate = format(new Date(...date), "dd/MMM/yyyy");
//     console.log(check, "date chaekc");
//     console.log(chatDate, "date chaekc");

//     return check === chatDate;
//   }
// };

// export default useExtractDate;
