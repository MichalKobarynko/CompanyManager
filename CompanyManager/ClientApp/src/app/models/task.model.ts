import { Subtask } from "./subtask.model";


export interface Task {
  id: string;
  title: string;
  description: string;
  tagNames: string[];
  tagFontColors: string[];
  tagBAckgroundColors: string[];
  columnName?: string;
  subtasks: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}
