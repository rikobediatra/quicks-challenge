import { Todo } from "@/interface/todo/todo";
import React, { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { BiPencil } from "react-icons/bi";
import { HiDotsHorizontal } from "react-icons/hi";

type Props = {
  todo: Todo;
  handleToggleTodo: (id: number) => void;
  removeTodoList: (id: number) => void;
  stateDescription: string;
  stateDueDate: string;
  setDescription: (e: any) => void;
  setDueDate: (e: any) => void;
  setEditTodo: (todo: Todo) => void;
  handleKeyPress: any;
};

// to count day left
function countDayLeft(date: string) {
  const dateNow = Date.now();
  const finalDate = new Date(date).getTime();
  const dayLeft = Math.floor((finalDate - dateNow) / (1000 * 60 * 60 * 24));
  return dayLeft;
}

function TaskItem({
  todo,
  handleToggleTodo,
  stateDescription,
  stateDueDate,
  setDescription,
  setDueDate,
  removeTodoList,
  setEditTodo,
  handleKeyPress,
}: Props) {
  const { id, title, description, dueDate, completed } = todo;

  const dayLeft = countDayLeft(dueDate);
  const lineThrough = completed ? "line-through" : "";

  // state for button hide content && button delete
  const [isOpen, setIsOpen] = useState(true);
  const [hiddenDetail, setHiddenDetail] = useState<string>("");
  const [isDeleteOpen, setIsDeletOpen] = useState(false);
  const [hiddenDelete, setHiddenDelete] = useState<string>("hidden");

  // state for edit title, description and edit date
  const [stateTitle, setStateTitle] = useState(title);
  const [isEditDesc, setIsEditDesc] = useState(false);
  const [isEditDate, setIsEditDate] = useState(false);

  const formatDayLeft = () => {
    if (dayLeft === -1) {
      return "0 Days Left";
    } else if (Number.isNaN(dayLeft)) {
      return "";
    } else {
      return `${dayLeft} Days Left`;
    }
  };

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      setHiddenDetail(newIsOpen ? "" : "hidden");
      return newIsOpen;
    });
  };

  const handleOpenDelete = () => {
    setIsDeletOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen;
      setHiddenDelete(newIsOpen ? "" : "hidden");
      return newIsOpen;
    });
  };

  const handleEdit = async (type: string) => {
    if (type === "desc") {
      setIsEditDesc((prevIsEditDesc) => {
        const newState = !prevIsEditDesc;
        return newState;
      });
    } else if (type === "date") {
      setIsEditDate((prevIsEditDesc) => {
        const newState = !prevIsEditDesc;
        return newState;
      });
    }
    await setEditTodo(todo);
  };

  return (
    <div className="border-b border-primary-grey pb-[22px]">
      {/* Header title*/}
      <div className="flex items-center justify-around ">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => handleToggleTodo(id)}
          className="w-[18px] h-[18px] bg-gray-100 border-black "
        />
        <input
          type="text"
          className={`${lineThrough} w-[380px] h-10 text-sm font-medium border-none rounded`}
          placeholder={stateTitle === "" ? "Type Task Title" : stateTitle}
          onChange={(e) => setStateTitle(e.target.value)}
          value={stateTitle}
        />
        <div className="flex justify-around items-center text-xs w-56 gap">
          <p className="text-indicator-red">{formatDayLeft()}</p>
          <p className="text-primary-grey">
            {new Date(dueDate).toLocaleDateString() === "Invalid Date"
              ? ""
              : new Date(dueDate).toLocaleDateString()}
          </p>
          <button type="submit" onClick={handleOpen}>
            {isOpen ? <FaAngleUp /> : <FaAngleDown />}
          </button>

          {/* Delete Option */}
          <div className="flex flex-col">
            <button onClick={handleOpenDelete}>
              <HiDotsHorizontal />
            </button>
            <div className={`${hiddenDelete} relative`}>
              <button
                className="absolute mt-1 -ml-28 w-[126px] h-8 border border-primary-grey text-indicator-red rounded"
                onClick={() => removeTodoList(id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className={`${hiddenDetail} pl-10 mt-3 text-xs flex flex-col gap-3`}>
        <div className="flex items-center gap-[18px]">
          <button onClick={() => handleEdit("date")}>
            <IoMdTime
              className={`h-5 w-5 ${isEditDate ? "text-primary-blue" : ""}`}
            />
          </button>
          <input
            type="date"
            className="h-10 text-sm rounded"
            placeholder={dueDate === "" ? "Set Date" : dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            onKeyPress={handleKeyPress}
            value={isEditDate ? stateDueDate : dueDate}
            disabled={!isEditDate}
          />
        </div>
        <div className="flex items-center gap-[18px]">
          <button onClick={() => handleEdit("desc")}>
            <BiPencil
              className={`h-5 w-5 ${isEditDesc ? "text-primary-blue" : ""}`}
            />
          </button>
          <input
            type="text"
            className={`${ isEditDesc ? "" : "border-none"} h-10 w-[543px] text-sm rounded`}
            placeholder={description === "" ? "No Description" : description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyPress={handleKeyPress}
            value={isEditDesc ? stateDescription : description}
            disabled={!isEditDesc}
          />
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
