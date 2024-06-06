"use client";
import Dropdown from "@/components/UI/dropdown/Dropdown";
import Loading from "@/components/UI/loading/Loading";
import TaskList from "@/components/UI/task/taskList/TaskList";
import { Todo } from "@/interface/todo/todo";
import { AppDispatch, RootState } from "@/store";
import {
  fetchTodos,
  addTodo,
  removeTodo,
  updateTodo,
  toggleTodo,
} from "@/store/slices/todoSlice";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/* 
Fitur for task,
To Enable input update press icon button beside input element,
To Trigger update for selected value use ENTER on keyboard after finished updating
*/

const listMenuDropdown = ["Personal Errands", "Urgent To-Do"];

function Task() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch<AppDispatch>();
  const firstRender = useRef(true);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleToogleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const removeTodoList = (id: number) => {
    dispatch(removeTodo(id));
  };

  // user edit without using button
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (editId) {
        dispatch(
          updateTodo({ id: editId, title, description, dueDate, completed })
        );
        setEditId(null);
      }

      // reset the state
      setTitle("");
      setDescription("");
      setDueDate("");
    }
  };

  const addNewTodo = () => {
    dispatch(
      addTodo({
        id: Math.floor(Math.random() * 200) + 1,
        title: "",
        description: "",
        dueDate: "",
        completed: false,
      })
    );
  };

  const setEditTodo = (todo: Todo) => {
    firstRender.current = false;
    setEditId(() => todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setDueDate(todo.dueDate);
    setCompleted(todo.completed);
  };

  return (
    <div className="w-full h-full px-8 py-6 ">
      <div className="flex items-center justify-between">
        <div className="w-72 flex items-center justify-center">
          <Dropdown listMenu={listMenuDropdown} />
        </div>
        <button
          className="text-white bg-primary-blue h-[35px] w-[101px] rounded-[5px]"
          onClick={addNewTodo}
        >
          New Task
        </button>
      </div>
      {/* TASK LIST */}
      <div className="h-[calc(100%-42px)] pt-[22px]">
        {loading ? (
          <Loading />
        ) : (
          <TaskList
            todos={todos}
            handleToggleTodo={handleToogleTodo}
            stateTitle={title}
            stateDescription={description}
            stateDueDate={dueDate}
            setTitle={setTitle}
            setDescription={setDescription}
            setDueDate={setDueDate}
            setEditTodo={setEditTodo}
            removeTodoList={removeTodoList}
            handleKeyPress={handleKeyPress}
          />
        )}
      </div>
    </div>
  );
}

export default Task;
