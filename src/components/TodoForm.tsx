import React, { Dispatch, SetStateAction, useState } from "react";
import TodoService from "../TodoService";
import TodoTypes from "../todo";
import "../CSS/TodoForm.css";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}

const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
  const [newTodoText, setNewTodoText] = useState<string>("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoText.trim() !== "") {
      const newTodo = TodoService.addTodo(newTodoText.trim());
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
    }
  };

  return (
    <form className="inputForm" onSubmit={handleAddTodo}>
      <input
        type="text"
        value={newTodoText}
        onChange={(e) => setNewTodoText(e.target.value)}
        autoFocus
        placeholder="Add a Task"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
