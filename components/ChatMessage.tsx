import React from "react";

interface ChatMessageProps {
  sender: string;
  message: string;
  isOwnMessage: boolean;
  timestamp: string;
}

const ChatMessage = ({
  sender,
  message,
  isOwnMessage,
  timestamp,
}: ChatMessageProps) => {
  // console.log(timestamp);
  const isSystemMessage = sender === "system";
  return (
    <div
      className={`flex mb-3 ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      } `}
    >
      <div className="flex flex-col gap-y-[12px]">
        <>
          {!isSystemMessage && (
            <div className="flex gap-x-[16px] items-center">
              <p className="text-sm font-bold text-[#DADADA]">{sender}</p>
              <p className="text-[#A0A0A0] text-[12px]">
                {new Date(timestamp).toLocaleString()}
              </p>
            </div>
          )}
        </>
        <div
          className={`flex items-center px-[14px] py-[8px] rounded-tr-xl rounded-br-xl rounded-bl-xl border border-[#323232] bg-[#00A3FF] ${
            isSystemMessage
              ? "bg-[#00A3FF] text-[#ded4d4] text-center text-xs"
              : isOwnMessage
              ? "bg-[#292929] text-white"
              : "bg-blue-400 text-white "
          }`}
        >
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
