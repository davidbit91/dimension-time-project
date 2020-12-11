import { iUser } from '../interfaces/user';
import { iTask } from './../interfaces/task';
export class Task implements iTask{
    id: string;
    name: string;
    startTime: number;
    totalTime: string;
    isFinished: boolean;
    user: iUser;

    constructor(id, name,user: iUser){
      this.id = id;
      this.name= name;
      this.startTime = new Date().getTime();
      this.totalTime = '';
      this.isFinished = false;
      this.user = user;
    }

    calculateFinishedTime(){
      const actualTime = new Date().getTime();
      const rest =  this.startTime.valueOf() - actualTime.valueOf();

      const date = new Date(rest);
      const hour = date.getHours();
      const minutes = date.getMinutes();


    }

}
