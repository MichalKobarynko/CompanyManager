import { Board } from './board.model';

export interface Project {
  id: string;
  title: string;
  users: string[];
  ownerID: string;
  boards: Board[];
  createdAt: Date;
  updatedAt: Date;
}
