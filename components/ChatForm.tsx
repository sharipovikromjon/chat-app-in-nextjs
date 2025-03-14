"use client";
import React from "react";
// import emoji from "../app/images/smile-emoji.svg";
// import telegram from "../app/images/telegram.svg";
// import Image from "next/image";

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
      className="flex flex-col gap-0 mt-4 sm:flex-row sm:gap-2"
      onSubmit={handleSubmit}
    >
      <input
        className="flex-1 px-4 py-2 bg-white border-2 mb-2 rounded-lg focus:outline-none sm:mb-0 sm:w-auto"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        type="text"
        placeholder="Type message..."
      />

      <button
        className="px-[18px] py-[11px] rounded-[12px] bg-[#00A3FF] text-white w-full sm:w-auto hover:bg-black transition linear duration-400"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
