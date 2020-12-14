import { iTask } from './task';

export interface iUser {
  id: string;
  name: string;
  email: string;
  tasks: iTask[];
}
