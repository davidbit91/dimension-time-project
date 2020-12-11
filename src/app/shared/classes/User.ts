import { iUser } from './../interfaces/user';
import { iTask } from './../interfaces/task';

export class User implements iUser{
  id: string;
  name: string;
  email: string;
  tasks: iTask[];

  constructor(id,name,email){
    this.id = id;
    this.name = name;
    this.email = email;
    this.tasks = [];
  }

  addTask(task: iTask){
    this.tasks.push(task);
  }
}

