import { iUser } from '../interfaces/user';
import { iTask } from './../interfaces/task';
export class Task implements iTask{
    id: string;
    name: string;
    startTime: number;
    totalTime: number;
    isFinished: boolean;

    constructor(name){
      this.id = '';
      this.name= name;
      this.startTime = Date.now();
      this.totalTime = 0;
      this.isFinished = false;
    }



}
