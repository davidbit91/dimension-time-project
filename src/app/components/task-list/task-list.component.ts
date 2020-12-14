import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { AuthService } from './../../shared/services/auth.service';
import { iUser } from './../../shared/interfaces/user';
import { Component, OnInit } from '@angular/core';

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

  finishTask(id){

  }
}
