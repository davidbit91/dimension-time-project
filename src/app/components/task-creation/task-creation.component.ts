import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ModalComponent } from './modal/modal.component';
import { Component, DoCheck, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/shared/classes/task';
import { User } from 'src/app/shared/classes/user';
import { iUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})
export class TaskCreationComponent implements OnInit, DoCheck, OnDestroy {

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private firestore: FirestoreService, private dialog: MatDialog, private snackBar: MatSnackBar) {
  }
  user: iUser;
  formGroup: FormGroup;
  taskList: string[];
  sub: Subscription;

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      task: ['', Validators.required]
    });

    this.sub = this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.firestore.getUserById$(user.uid).subscribe(userInfo =>{
          this.user = userInfo;
        })
      }
    });
  }

  ngDoCheck(): void{
    this.taskList = JSON.parse(localStorage.getItem('task'));
  }

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }

  addTask(){
    if(this.formGroup.get('task').value == 'createNew'){
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '450px',
        height: '300px',
        data: '',
        position: {top: "250px"}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }

  }


  onSubmit(){
    const n = this.formGroup.get('task').value;
    const t = new Task(n);
   t.id = this.firestore.generateTaskId();
    this.firestore.createTask(t);
    //añade tarea en el user
    this.user.tasks.push(t);
    const tl = this.user.tasks.map((e) => {
      return Object.assign({}, e);
    });
    this.user.tasks = tl;

    this.firestore.updateUser(this.user).then(() =>  this.snackBar.open("Task started", "Dismiss", {duration: 3000}));
  }
}
