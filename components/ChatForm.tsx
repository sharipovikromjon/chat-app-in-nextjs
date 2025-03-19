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
      className="flex flex-col py-[22px] px-[46px] bg-[#121212] border-t border-[#303030] sm:flex-row sm:gap-2 "
      onSubmit={handleSubmit}
    >
      <input
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
// Telegram icon
/*
min-w-[119px] rounded-lg bg-[#00A3FF] text-white px-[18px] py-[11px] transition-all duration-400 ease-linear hover:bg-[#121212] hover:bg-[url('./images/telegram-icon.svg')] hover:bg-no-repeat hover:bg-center hover:text-transparent
*/
//button styles
// px-[18px] py-[11px] rounded-[12px] bg-[#00A3FF] text-white w-full sm:w-auto hover:bg-black transition linear duration-400

export default ChatForm;
