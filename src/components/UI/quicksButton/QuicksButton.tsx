"use client";
import React, { useState } from "react";
import Image from "next/image";

type props = {
  activeQuicks: string | undefined,
  setActiveQuicks: (e: string) => void,
}

const QuicksButton = ({ activeQuicks, setActiveQuicks }: props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<string>("hidden");

  const handleActive = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsActive((prevIsActive) => {
      const newIsActive = !prevIsActive;
      setIsHidden(newIsActive ? "flex" : "hidden");
      return newIsActive;
    });
  };

  const handleActiveInbox = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveQuicks("inbox");
    handleActive(e);
  };
  
  const handleActiveTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveQuicks("task");
    handleActive(e);
  };

  const renderedButton = () => {
    let imageSrc; 
    let color;
    let size;
    let shadow = "";

    if (activeQuicks === "inbox") {
      imageSrc = "./chatActive.svg";
      color = "bg-indicator-purple";
      size = 25;
      shadow = "shadow-[-10px_0px_0px_0px_#828282]";
      
    } else if (activeQuicks === "task") {
      imageSrc = "./taskActive.svg";
      color = "bg-indicator-orange";
      size = 25;
      shadow = "shadow-[-10px_0px_0px_0px_#828282]";
      
    } else {
      imageSrc = "./cloud-lightning.svg";
      color = "bg-primary-blue";
      size = 50;
    }

    return (
      <button
        onClick={handleActive}
        className={`flex items-center justify-center ${color} text-white w-[68px] h-[68px] rounded-full ${shadow}`}
      >
        <Image src={imageSrc} alt="quicks" width={size} height={size} />
      </button>
    );
  }

  return (
    <div className="fixed flex justify-center items-center bottom-6 end-6 gap-6">
      <div className={`${isHidden} items-center justify-center gap-6`}>
        <button
          className="relative flex items-center justify-center w-[68px] h-[68px] text-gray-500 bg-white rounded-full"
          onClick={handleActiveTask}
        >
          <Image src={"./task.svg"} alt="task" width={25} height={25} />
          <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -top-6 text-white">
            Task
          </span>
        </button>
        <button
          className="relative flex items-center justify-center w-[68px] h-[68px] text-gray-500 bg-white rounded-full"
          onClick={handleActiveInbox}
        >
          <Image src={"./chat.svg"} alt="inbox" width={25} height={25} />
          <span className="absolute block mb-px text-sm font-medium -translate-y-1/2 -top-6 text-white">
            Inbox
          </span>
        </button>
      </div>
      {renderedButton()}
    </div>
  );
};

export default QuicksButton;
