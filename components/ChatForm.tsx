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
        type="text"
        placeholder="Placeholder..."
      />
      <button
        className="px-4 py-2 rounded-lg bg-blue-500 text-white w-full sm:w-auto hover:bg-blue-600 transition duration-300"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
