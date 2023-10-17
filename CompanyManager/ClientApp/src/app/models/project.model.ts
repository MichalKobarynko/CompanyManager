import { Board } from './board.model';

export interface Project {
  id: string;
  title: string;
  users: string[];
  ownerID: string;
  boards: Board[];
  createAt: Date;
  updateAt: Date;
}
