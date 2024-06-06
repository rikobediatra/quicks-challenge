import { Message, User } from "@/interface/inbox/inbox";
import React from "react";

type Props = {
    title: string,
    message: Message[],
    participants: User[]
};

const ChatItems = ({ title, message, participants}: Props) => {

  const { username } = participants[1];
  const lastMessage = message[1].message;
  const lastTime = message[1].timestamp 

  return (
    <>
      <div className="flex gap-4">
        <h1 className="text-primary-blue font-bold text-base">
          {title}
        </h1>
        <p>{lastTime}</p>
      </div>
      <div>
        <h1 className="text-primary-background font-bold text-sm">
          {username}
        </h1>
      </div>
      <div>
        <p className="text-sm">{lastMessage}</p>
        {/* Indicator */}
      </div>
    </>
  );
};

export default ChatItems;
