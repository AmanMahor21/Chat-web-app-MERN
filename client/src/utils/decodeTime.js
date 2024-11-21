import { format } from "date-fns";

//Time at which the message received
const decodeTime = (createdAt) => {
  const date = new Date(createdAt);
  const formattedTime = format(date, "HH:mm");
  return formattedTime;
};


export { decodeTime };
