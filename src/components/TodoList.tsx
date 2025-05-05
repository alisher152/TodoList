import React, { useState } from "react";
import TodoTypes from "../todo";
import TodoService from "../TodoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import TodoForm from "./TodoForm";
import "../CSS/TodoList.css";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditedTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  const toggleSelect = (id: number) => {
    setSelectedTodos((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const deleteSelected = () => {
    const newTodos = todos.filter((todo) => !selectedTodos.has(todo.id));
    selectedTodos.forEach((id) => TodoService.deleteTodo(id));
    setTodos(newTodos);
    setSelectedTodos(new Set());
  };

  const handleEditStart = (id: number, text: string) => {
    setEditedTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  };

  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updatedTodo = TodoService.updateTodo({
        id,
        text: editedTodoText.trim(),
        completed: todos.find((todo) => todo.id === id)?.completed || false,
      });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setEditedTodoId(null);
      setEditedTodoText("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    TodoService.updateTodo(updatedTodos.find((todo) => todo.id === id)!);
  };

  return (
    <div className="todoContainer">
      <TodoForm setTodos={setTodos} />

      {selectedTodos.size > 0 && (
        <button className="bulkDelete" onClick={deleteSelected}>
          Delete Selected ({selectedTodos.size})
        </button>
      )}

      {todos.length === 0 ? (
        <p className="empty-message">No todos yet. Add your first task!</p>
      ) : (
        todos.map((todo) => (
          <div
            className={`items ${todo.completed ? "completed" : ""}`}
            key={todo.id}
          >
            <input
              type="checkbox"
              checked={selectedTodos.has(todo.id)}
              onChange={() => toggleSelect(todo.id)}
            />

            {editingTodoId === todo.id ? (
              <div className="editingText">
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleEditSave(todo.id)
                  }
                />
                <button onClick={() => handleEditSave(todo.id)}>
                  <FaCheck />
                </button>
                <button className="cancelBtn" onClick={handleEditCancel}>
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="editBtn">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span className={todo.completed ? "completed-text" : ""}>
                  {todo.text}
                </span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  <FaEdit />
                </button>
              </div>
            )}

            <button
              className="deleteBtn"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <RiDeleteBin5Fill />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;
