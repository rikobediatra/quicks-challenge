import React from "react";
import { IoPersonOutline } from "react-icons/io5";

const ContactIcon = () => {
  return (
    <div className="top-0 left-0 relative w-[51px] h-[34px]">
      <div className="absolute h-[34px] w-[34px] rounded-full bg-primary-white flex items-center justify-center">
        <IoPersonOutline className="text-primary-background w-4 h-4" />
      </div>
      <div className="absolute left-4 h-[34px] w-[34px] rounded-full bg-primary-blue flex items-center justify-center">
        <IoPersonOutline className="text-primary-white w-4 h-4" />
      </div>
    </div>
  );
};

export default ContactIcon;
