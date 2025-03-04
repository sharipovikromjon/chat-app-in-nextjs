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
    // console.log("Submitted");
    if (message.trim() != "") {
      setMessage("");
    }
  };
  return (
    <form className="flex gap-2 mt-4" onSubmit={handleSubmit}>
      <input
        className="flex-1 px-4 py-2 border-2 rounded-lg focus:outline-none"
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Placeholder..."
      />
      <button
        className="px-4 py-2 rounded-lg bg-blue-500 text-white"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
