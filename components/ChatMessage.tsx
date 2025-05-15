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
      {/* Username and timestamp or system message */}
      <div className="flex flex-col gap-y-[12px]">
        <>
          {!isSystemMessage && (
            <p
              className={`text-sm font-bold text-[#76767C] tracking-[0.3px] mt-[20px] ${
                isOwnMessage && "text-right"
              }`}
            >
              {sender}
            </p>
          )}
        </>
        {/* User's message or system message */}
        {isOwnMessage && (
          <div>
            <div
              className={`flex items-center px-[12px] py-[8px] border border-[#323232] mb-[10px] ${
                isSystemMessage
                  ? "bg-black text-white text-center text-xs rounded-xl"
                  : isOwnMessage
                  ? "bg-[#2E3B5B] rounded-tl-xl rounded-br-xl rounded-bl-xl"
                  : "bg-[#000929] rounded-tl-xl rounded-br-xl rounded-bl-xl"
              }`}
            >
              <p className="text-white">{message}</p>
            </div>
            {!isSystemMessage && (
              <p className="text-[#A0A0A0] text-[12px]">
                {new Date(timestamp)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toUpperCase()}
              </p>
            )}
          </div>
        )}
        {/* Other user's message */}
        {!isOwnMessage && (
          <div>
            <div
              className={`flex items-center px-[14px] py-[8px]  border border-[#323232] mb-[10px] ${
                isSystemMessage
                  ? "bg-black text-center text-xs rounded-xl"
                  : isOwnMessage
                  ? "bg-[#000929] rounded-tr-xl rounded-br-xl rounded-bl-xl"
                  : "bg-[#2E3B5B] rounded-tr-xl rounded-br-xl rounded-bl-xl"
              }`}
            >
              <p className="text-white">{message}</p>
            </div>
            {!isSystemMessage && (
              <p className="text-[#A0A0A0] text-[12px]">
                {new Date(timestamp)
                  .toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .toUpperCase()}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
