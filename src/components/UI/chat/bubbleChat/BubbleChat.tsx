import { Message } from "@/interface/inbox/inbox";
import React, { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";

type Props = {
  message: Message;
};

const BubbleChat = ({ message }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const date = new Date(message.timestamp);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {message.sender !== "user" ? (
        <>
          <p className={`lato font-black text-[#E5A443]`}>{message.sender}</p>
          <div className=" w-3/4 flex flex-row items-start gap-2">
            <div className="w-full">
              <div className="bg-chat-orange w-fit p-[10px] rounded">
                <p>{message.message}</p>
                <p>
                  {hours}:{minutes}
                </p>
              </div>
            </div>
            <div>
              <button onClick={handleDropdown}>
                <HiDotsHorizontal />
              </button>
              <div className="relative">
                <div
                  className={`${
                    isOpen ? "" : "hidden"
                  }  absolute w-32 h-20 bg-white flex pl-4 text-center flex-col border border-primary-grey rounded`}
                >
                  <p className="h-10 flex items-center text-primary-blue cursor-pointer">
                    Edit
                  </p>
                  <hr className="w-full" />
                  <p className="h-10 flex items-center text-indicator-red cursor-pointer">
                    Delete
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className={`lato font-black text-[#9B51E0]`}>{message.sender}</p>
          <div className=" w-2/4 flex flex-row items-start gap-2">
            {/* Dropdown Edit Delete */}
            <div>
              <button onClick={handleDropdown}>
                <HiDotsHorizontal />
              </button>
              <div className="relative">
                <div
                  className={`${
                    isOpen ? "" : "hidden"
                  }  absolute w-32 h-20 bg-white flex pl-4 text-center flex-col border border-primary-grey rounded`}
                >
                  <p className="h-10 flex items-center text-primary-blue cursor-pointer">
                    Edit
                  </p>
                  <hr className="w-full" />
                  <p className="h-10 flex items-center text-indicator-red cursor-pointer">
                    Delete
                  </p>
                </div>
              </div>
            </div>
            {/* Bubble Chat */}
            <div className="w-full">
              <div className="bg-chat-purple w-full p-[10px] rounded">
                <p>{message.message}</p>
                <p>
                  {hours}:{minutes}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default BubbleChat;
