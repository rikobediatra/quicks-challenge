import React from "react";
import TaskItem from "../taskItem/TaskItem";
import { Todo } from "@/interface/todo/todo";

type Props = {
  todos: Todo[];
  handleToggleTodo: (id: number) => void;
  removeTodoList: (id: number) => void;
  stateTitle: string;
  stateDescription: string;
  stateDueDate: string;
  setTitle: (e: any) => void;
  setDescription: (e: any) => void;
  setDueDate: (e: any) => void;
  setEditTodo: (todo: Todo) => void;
  handleKeyPress: any;
};

function TaskList({
  todos,
  handleToggleTodo,
  stateTitle,
  stateDescription,
  stateDueDate,
  setTitle,
  setDescription,
  setDueDate,
  removeTodoList,
  setEditTodo,
  handleKeyPress,
}: Props) {
  const renderedTask = todos
    .map((todo) => {
      return (
        <div key={todo.id} className="pb-[22px]">
          <TaskItem
            todo={todo}
            handleToggleTodo={handleToggleTodo}
            removeTodoList={removeTodoList}
            setEditTodo={setEditTodo}
            stateDescription={stateDescription}
            stateDueDate={stateDueDate}
            setDescription={setDescription}
            setDueDate={setDueDate}
            handleKeyPress={handleKeyPress}
          />
        </div>
      );
    })
    .reverse();

  return <div className="h-full overflow-auto">{renderedTask}</div>;
}

export default TaskList;
