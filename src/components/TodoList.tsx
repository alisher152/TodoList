import React, { useState, useEffect } from "react";
import TodoService from "../TodoService";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import { TodoTypes } from "../todo";
import "../CSS/TodoList.css";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoTypes[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  useEffect(() => {
    setTodos(TodoService.getTodos());
  }, []);

  const handleAddTodo = (newTodo: TodoTypes) => setTodos([...todos, newTodo]);
  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleEditTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };
  const handleDeleteTodo = (id: number) =>
    setTodos(todos.filter((todo) => todo.id !== id));

  // 📌 Фильтрация задач в зависимости от выбранного фильтра
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>Task List</h1>

      {/* 📌 Фильтры */}
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TodoForm onAddTodo={handleAddTodo} />

      {/* 📌 Отображение отфильтрованных задач */}
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEditTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
