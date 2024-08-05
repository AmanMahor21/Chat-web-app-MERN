import React, { useContext, useEffect } from "react";
import { authContext } from "../context/UserRegister";
import useStore from "../store/store";
// import notificationSound from "../assets/sounds/notification.mp3";

const useGetTextFromSocket = () => {
  const { chat, setChat } = useStore();
  const { socketIo } = useContext(authContext);
  useEffect(() => {
    socketIo?.on("textSend", (newMessage) => {
      // const sound = new Audio(notificationSound);
      // sound.play();

      setChat([...chat, newMessage]);
    });
    return () => socketIo?.off("textSend");
  }, [chat, setChat, socketIo]);
};

export default useGetTextFromSocket;
