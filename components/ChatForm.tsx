"use client";
import React from "react";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = React.useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() != "") {
      onSendMessage(message);
      setMessage("");
    }
  };
  return (
    <form
      className="flex flex-col py-[20px]  px-[46px] bg-[#fff] border-t border-[#303030] sm:flex-row sm:gap-2 "
      onSubmit={handleSubmit}
    >
      <input
        id="messages"
        name="messages"
        className="flex-1 bg-[#F7F7FD]  rounded-[20px] text-[#000] font-[24px] mb-2 py-[20px] px-[26px] focus:outline sm:mb-0 sm:w-auto"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Type your message"
      />

      <button
        className="bg-[#2E3B5B] text-white font-[600] py-[10px] px-[20px] rounded-[10px] w-[54px] sm:w-auto hover:bg-[#0CAF60] transition linear duration-400"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};
export default ChatForm;
