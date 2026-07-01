import type { TaskPriority } from './task';

export interface TaskRequest {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;         
}