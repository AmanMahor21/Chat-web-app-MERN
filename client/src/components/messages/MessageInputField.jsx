import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import useSendMessages from "../../hooks/useSendMessages.js";

const MessageInputField = () => {
  const [input, setInput] = useState();
  const sendMessage = useSendMessages();

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
      <button type="sumbit" className="sendBtn">
        <IoIosSend />
      </button>
    </form>
  );
};

export default MessageInputField;
