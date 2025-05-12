import React, { useState } from "react";
import TodoService from "../TodoService";
import { TodoTypes } from "../todo";
import "../CSS/TodoForm.css";

interface TodoFormProps {
  onAddTodo: (todo: TodoTypes) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      const deadlineDate = deadline ? new Date(deadline) : undefined;
      const newTodo = TodoService.addTodo(text, priority, deadlineDate);
      onAddTodo(newTodo);
      setText("");
      setPriority("medium");
      setDeadline("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as any)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
      />
      <button type="submit">Add a Task</button>
    </form>
  );
};

export default TodoForm;
