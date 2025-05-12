import React, { useState } from "react";
import { FaEdit, FaCheck, FaRegCalendarAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TodoTypes } from "../todo";
import "../CSS/TodoItem.css";

interface TodoItemProps {
  todo: TodoTypes;
  onToggleComplete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditSave = () => {
    if (editedText.trim()) {
      onEdit(todo.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        todo.priority || ""
      }`}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleEditSave}>
            <FaCheck />
          </button>
          <button onClick={() => setIsEditing(false)}>
            <GiCancel />
          </button>
        </div>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
          />
          <span>{todo.text}</span>
          {todo.deadline && (
            <span>
              <FaRegCalendarAlt />{" "}
              {new Date(todo.deadline).toLocaleDateString()}
            </span>
          )}
          {todo.priority && <span>{todo.priority}</span>}
          <button onClick={() => setIsEditing(true)}>
            <FaEdit />
          </button>
          <button onClick={() => onDelete(todo.id)}>
            <RiDeleteBin5Fill />
          </button>
        </>
      )}
    </div>
  );
};

export default TodoItem;
