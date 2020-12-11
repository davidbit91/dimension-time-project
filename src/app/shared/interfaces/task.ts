import { iUser } from './user';

export interface iTask {
  id: string;
  name: string;
  startTime: number;
  totalTime: string;
  isFinished: boolean;
  user: iUser;
}
