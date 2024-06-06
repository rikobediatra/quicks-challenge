import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const Dropdown = ({ listMenu }: { listMenu: string[] }) => {
  const [isHidden, setIsHidden] = useState(true);
  let hidden = isHidden ? "hidden": '';
  
  const renderedMenu = listMenu.map((menu) => {
    return (
        <div key={menu}>
            <li>
                <a
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                {menu}
                </a>
            </li>
        </div>
    );
  });

  const handleOpenDropDown = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="flex flex-col relative">
      <button
        id="dropdownDividerButton"
        data-dropdown-toggle="dropdownDivider"
        className= "bg-white font-medium w-28 h-10 rounded-md text-xs font-lato px-4 py-2.5 text-center inline-flex justify-between items-center border border-black"
        onClick={handleOpenDropDown}
      >
        My Tasks
        <div>
          <FaAngleDown />
        </div>
      </button>

      {/* Dropdown Menu */}
      <div
        id="dropdownDivider"
        className={`${hidden} fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow h-20 w-72 mt-4 border border-primary-grey`}
      >
        <ul
          className="py-2 font-lato text-xs text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDividerButton"
        >
            {renderedMenu}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
