// Имитация сервиса с локальным состоянием в памяти
import TodoTypes from "./todo";

let todos: TodoTypes[] = [];
let nextId = 1;

const TodoService = {
  getTodos: () => [...todos],
  addTodo: (text: string): TodoTypes => {
    const newTodo = { id: nextId++, text, completed: false };
    todos.push(newTodo);
    return newTodo;
  },
  updateTodo: (updated: TodoTypes): TodoTypes => {
    todos = todos.map((todo) => (todo.id === updated.id ? updated : todo));
    return updated;
  },
  deleteTodo: (id: number) => {
    todos = todos.filter((todo) => todo.id !== id);
  },
};

export default TodoService;
