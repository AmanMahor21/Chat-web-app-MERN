import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client"; // Ensure correct import
// import useStore from "../store/store";
const authContext = createContext();

const UserRegisterContext = ({ children }) => {
  const [saveUser, setSaveUser] = useState(null);
  const [socketIo, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [formateDate, setFormatDate] = useState([]);

  // console.log(onlineUser, "56666522");
  useEffect(() => {
    // console.log(saveUser, "saveUser saveUser");
    if (!saveUser) {
      // Close socket connection if no user
      if (setSocket) {
        socketIo?.close();
        setSocket(null);
      }
      return;
    }
    if (!saveUser) return;
    // Create socket connection
    const socket = io(`${process.env.REACT_APP_BACKEND_URL}`, {
      query: { userId: saveUser._id },
      transports: ["websocket"],
      withCredentials: true,
    });
    setSocket(socket);

    socket.on("connect", (soc) => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("activeUser", (activeUser_Id) => {
      console.log(activeUser_Id, "activeUser_Id");
      setOnlineUser(activeUser_Id);
    });

    socket.on("disconnect", () => {
      console.error("Socket disconnected:", socket.id);
    });

    socket.on("error", (err) => {
      console.error("Socket error:", err);
    });

    // Clean up on component unmount
    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [saveUser]);

  return (
    <authContext.Provider
      value={{
        saveUser,
        setSaveUser,
        socketIo,
        onlineUser,
        formateDate,
        setFormatDate,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, UserRegisterContext };
