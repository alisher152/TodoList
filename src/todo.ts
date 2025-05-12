export interface TodoTypes {
  id: number;
  text: string;
  completed: boolean;
  priority?: "low" | "medium" | "high";
  deadline?: string;
  createdAt: string;
}
