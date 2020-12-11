import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class TaskCreationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private firestore: FirestoreService) {
    this.taskList = ['peta','pumba','pimba'];
  }
  user: iUser;
  formGroup: FormGroup;
  taskList: string[];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      task: ['', Validators.required]
    });

    this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.firestore.getUserById$(user.uid).subscribe(userInfo =>{
          this.user = userInfo;
        })
      }
    });
  }

  addTask(){
    /* CREA MODAL*/

  }

  onSubmit(){
    const n = this.formGroup.get('task').value;
    const t = new Task(n,this.user);
    t.id = this.firestore.generateTaskId();
    this.firestore.createTask(t);

    //Subir tarea con usuario asignado, luego actualizar usuario con la tarea creada previamente
    /*this.firestore.updateUser(this.user);*/
  }

}
