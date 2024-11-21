import React, { useContext} from "react";
import MessageHeader from "./MessageHeader";
import ConversationBox from "./ConversationBox";
import { TiMessages } from "react-icons/ti";
import MessageInputField from "./MessageInputField";
// import useStore from "../../store/store";
import { authContext } from "../../context/UserRegister";

const MessageContainer = () => {
  // const { selected, setSelected } = useStore();
  const welcomeScreen = false;
  // const welcomeScreen = selected ? false : true;
  // useEffect(() => {
  //   return () => setSelected(null);
  // }, [setSelected]);
  return (
    <div className="MessageWrapper">
      {welcomeScreen ? (
        <Welcometext />
      ) : (
        <>
          <MessageHeader />
          <ConversationBox />
          <MessageInputField />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const Welcometext = () => {
  const { saveUser } = useContext(authContext);
  return (
    <div className="welcomeWrapper d-flex justify-content-center align-items-center flex-column h-100 text-4xl text-[#2c2c32]">
      <h2 className="py-4">Welcome to {saveUser?.username}</h2>
      <h2 className="pb-4">Select a chat to start messaging</h2>
      <TiMessages className="w-[74px] h-[74px]" />
    </div>
  );
};
