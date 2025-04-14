import { useContext, useEffect } from "react";
import { authContext } from "../context/UserRegister";
import useStore from "../store/store";
// import notificationSound from "../assets/sounds/notification.mp3";

const useGetTextFromSocket = () => {
  const { setChat, addNewMsg } = useStore();
  const { socketIo } = useContext(authContext);
  // console.log(chat, "1st");
  useEffect(() => {
    socketIo?.on("textSend", (newMessage) => {
      // const sound = new Audio(notificationSound);
      // sound.play();
      addNewMsg(newMessage);
    });
    return () => socketIo?.off("textSend");
  }, [setChat, socketIo, addNewMsg]);
};

export default useGetTextFromSocket;
