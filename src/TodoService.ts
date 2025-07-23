import { TodoTypes } from "./todo";

class TodoService {
  private static instance: TodoService;
  private todos: TodoTypes[] = [];
  private nextId = 1;

  private constructor() {}

  public static getInstance(): TodoService {
    if (!TodoService.instance) {
      TodoService.instance = new TodoService();
    }
    return TodoService.instance;
  }

  public getTodos(): TodoTypes[] {
    return [...this.todos]; // Возвращаем копию массива
  }

  public addTodo(
    text: string,
    priority: "low" | "medium" | "high",
    deadline?: Date
  ): TodoTypes {
    const newTodo: TodoTypes = {
      id: this.nextId++,
      text,
      completed: false,
      priority,
      deadline: deadline?.toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.todos.push(newTodo);
    return { ...newTodo }; // Возвращаем копию объекта
  }

  public updateTodo(updatedTodo: TodoTypes): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = { ...updatedTodo };
    }
  }

  public deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  public deleteCompleted(): void {
    this.todos = this.todos.filter((todo) => !todo.completed);
  }
}

export default TodoService.getInstance();
