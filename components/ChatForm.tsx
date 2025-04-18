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
      className="flex flex-col py-[22px] px-[46px] bg-[#121212] border-t border-[#303030] sm:flex-row sm:gap-2 "
      onSubmit={handleSubmit}
    >
      <input
        id="messages"
        name="messages"
        className="flex-1 text-[#fff] font-[24px] px-4 py-2  mb-2 rounded-lg focus:outline-none sm:mb-0 sm:w-auto"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Type message..."
      />

      <button
        className="bg-[#00A3FF] text-white px-[18px] py-[11px] rounded-[12px] w-full sm:w-auto hover:bg-white hover:text-[#121212] transition linear duration-400"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};
export default ChatForm;
