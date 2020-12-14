import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AuthService } from './../../shared/services/auth.service';
import { iUser } from './../../shared/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { Task } from './../../shared/classes/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  user : iUser;
  constructor(private auth: AuthService, private firestore: FirestoreService) {
    this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.firestore.getUserById$(user.uid).subscribe(userInfo =>{
          this.user = userInfo;
          console.log(this.user);
        })
      }
    });
  }

  ngOnInit(): void {
  }

  finishTask(id) {
    this.user.tasks.map((e) => {
      if (e.id == id) {
        return this.calculateFinishedTime(e);
      } else {
        return e;
      }
    });
    this.firestore.updateUser(this.user);
    this.firestore.updateTask(this.user.tasks.find((e)=>e.id == id));
  }

  calculateFinishedTime(t: Task) {
    const actualTime = Date.now();
    console.log(actualTime);
    console.log(t.startTime);


    t.totalTime =  actualTime - t.startTime;
    console.log(t.totalTime);

    t.isFinished = true;

    return t;
  }
  calculateTime(n){
    return Math.round(n / 3600000);
  }
}
