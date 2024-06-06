import React from "react";
import { Inbox } from "@/interface/inbox/inbox";
import ContactIcon from "../../contactIcon/ContactIcon";
import ChatItems from "../chatItems/ChatItems";

type Props = {
  data: Inbox[],
  setChatIsOpen: (e: boolean) => void,
  setIdMessage: (e: number) => void,
};

const ChatList = ({ data, setChatIsOpen, setIdMessage }: Props) => {

  const handleClick = async (id: number) => {
    setChatIsOpen(true);
    await setIdMessage(id);
  };

  const renderedChatList = data.map((item) => {
    return (
      <div
        key={item.id}
        className="w-full py-[22px] border-b border-primary-grey flex flex-row items-center gap-4 cursor-pointer"
        onClick={() => handleClick(item.id)}
      >
        {/* icon */}
        <div>
          <ContactIcon />
        </div>
        {/* content */}
        <div className="w-full flex flex-col gap-1">
          <ChatItems
            title={item.title}
            message={item.message}
            participants={item.participants}
          />
        </div>
      </div>
    );
  });

  return (
    <div className={`h-[calc(100%-32px)] w-full font-lato`}>
      {renderedChatList}
    </div>
  );
};

export default ChatList;
