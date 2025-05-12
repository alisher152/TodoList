import { TodoTypes } from "./todo";

const todos: TodoTypes[] = [];

export default {
  getTodos: () => todos,
  addTodo: (
    text: string,
    priority: "low" | "medium" | "high",
    deadline?: Date
  ) => {
    const newTodo: TodoTypes = {
      id: todos.length + 1,
      text,
      completed: false,
      priority,
      deadline: deadline?.toISOString() || undefined,
      createdAt: new Date().toISOString(),
    };
    todos.push(newTodo);
    return newTodo;
  },
  updateTodo: (updatedTodo: TodoTypes) => {
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) todos[index] = updatedTodo;
  },
  deleteTodo: (id: number) => {
    const index = todos.findIndex((todo) => todo.id === id);
    if (index !== -1) todos.splice(index, 1);
  },
  deleteCompleted: () => {
    todos.filter((todo) => !todo.completed);
  },
};
