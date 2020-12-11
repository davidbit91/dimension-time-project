import { iUser } from './../interfaces/user';
import { iTask } from './../interfaces/task';

export class User implements iUser{
  id: string;
  name: string;
  email: string;
  tasks: iTask[];

  constructor(id,name,email, tasks : iTask[] | null){
    this.id = id;
    this.name = name;
    this.email = email;
    this.tasks = tasks ? tasks : [];
  }

  addTask(task: iTask){
    this.tasks.push(task);
  }

}

