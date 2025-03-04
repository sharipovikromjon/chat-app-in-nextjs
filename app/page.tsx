"use client";
import ChatForm from "@/components/ChatForm";
// import Image from "next/image";

export default function Home() {
  const handleSendMessage = (message: string) => {
    console.log(message);
  };
  return (
    <div className="flex mt-24 justify-center w-full">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="mb-4 font-bold text-2xl">Room 1</h1>
        <div>{/* TODO: Add chat room */}</div>
        <ChatForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
