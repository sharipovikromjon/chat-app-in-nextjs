import React from "react";

// Interface for the props
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
  const isSystemMessage = sender === "system";
  return (
    <div
      className={`flex gap-x-[14px] mb-3 ${
        isSystemMessage
          ? "justify-center"
          : isOwnMessage
          ? "justify-end"
          : "justify-start"
      } `}
    >
      {!isOwnMessage && (
        <div className="w-[50px] h-[50px] bg-[#fff] border border-[#4E4E4E] rounded-[50px]"></div>
      )}
      {/* Username and timestamp or system message */}
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
        {/* User's message or system message */}
        {isOwnMessage && (
          <div
            className={`flex items-center px-[14px] py-[8px] rounded-tl-xl rounded-br-xl rounded-bl-xl border border-[#323232] bg-[#292929] ${
              isSystemMessage
                ? "bg-black text-white text-center text-xs"
                : isOwnMessage
                ? "bg-[#292929] text-white"
                : "bg-blue-400 text-white "
            }`}
          >
            <p>{message}</p>
          </div>
        )}
        {/* Other user's message */}
        {!isOwnMessage && (
          <div
            className={`flex items-center px-[14px] py-[8px] rounded-tr-xl rounded-br-xl rounded-bl-xl border border-[#323232] bg-[#292929] ${
              isSystemMessage
                ? "bg-black text-white text-center text-xs"
                : isOwnMessage
                ? "bg-[#292929] text-white"
                : "bg-blue-400 text-white "
            }`}
          >
            <p>{message}</p>
          </div>
        )}
      </div>
      {/* User's avatar */}
      {isOwnMessage && (
        <div className="w-[50px] h-[50px] bg-[#fff] border border-[#4E4E4E] rounded-[50px]"></div>
      )}
    </div>
  );
};

export default ChatMessage;
