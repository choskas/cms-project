export type StatusTasksT = "todo" | "in_progress" | "ready";

export type Tasks = {
  createdAt: number;
  description: string;
  id: number;
  status: StatusTasksT;
  title: string;
  updatedAt: number;
};
