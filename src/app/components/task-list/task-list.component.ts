import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AuthService } from './../../shared/services/auth.service';
import { iUser } from './../../shared/interfaces/user';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Task } from './../../shared/classes/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  sub: Subscription;
  user: iUser;
  @Input() filter: string;

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.sub = this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.firestore.getUserById$(user.uid).subscribe((userInfo) => {
          this.user = userInfo;
        });
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  finishTask(id) {
    this.user.tasks.map((e) => {
      if (e.id == id) {
        return this.calculateFinishedTime(e);
      } else {
        return e;
      }
    });
    this.firestore.updateUser(this.user).then(() => {
      this.firestore.updateTask(this.user.tasks.find((e) => e.id == id)).then(() => this.snackBar.open("Task Finished", "Dismiss", {duration: 3000}));
    });

  }

  calculateFinishedTime(t: Task) {
    const actualTime = Date.now();
    t.totalTime = actualTime - t.startTime;
    t.isFinished = true;
    return t;
  }
  calculateTime(n) {
    return Math.round(n / 3600000);
  }
  checkIsFinished(){
    return this.user?.tasks.findIndex( e => e.isFinished == false) < 0 ? true : false;
  }
}
