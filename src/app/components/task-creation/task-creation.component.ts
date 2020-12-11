import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-creation',
  templateUrl: './task-creation.component.html',
  styleUrls: ['./task-creation.component.scss']
})
export class TaskCreationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    this.taskList = ['peta','pumba','pimba'];
  }
  formGroup: FormGroup;
  taskList: string[];

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      task: ['', Validators.required]
    });

  }

  addTask(){
    /* CREA MODAL*/

  }

  onSubmit(){

  }

}
