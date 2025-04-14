import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSendMessages } from "../../hooks/useSendMessages.js";

const MessageInputField = () => {
  const [input, setInput] = useState("");
  // const [inputDebounce, setInputDebounce] = useState(input);
  const sendMessage = useSendMessages();

  // useEffect(() => {
  //   const inputTimeOut = setTimeout(() => {
  //     setInputDebounce(input);
  //   }, 400);

  //   return () => {
  //     clearTimeout(inputTimeOut);
  //   };
  // }, [input]);

  const sendMessageHandle = async (e) => {
    e.preventDefault();
    if (input && input.trim() !== "") {
      await sendMessage(input);
      setInput("");
    }
  };
  return (
    <form className="messsageInput_wrapper" onSubmit={sendMessageHandle}>
      <input
        type="text"
        value={input}
        placeholder="Type your messsage here"
        className="messsageInput"
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="sendBtn ">
        {/* <button type="submit" className="sendBtn "> */}
        <IoIosSend className=" hover:fill-[#082c39]" />
      </button>
    </form>
  );
};

export default MessageInputField;
