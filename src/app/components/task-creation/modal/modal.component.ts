import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  dialogForm: FormGroup;
  localList: string[];
  constructor(public dialogRef: MatDialogRef<ModalComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private formBuilder: FormBuilder,
  private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

  }

  onSubmit(){
    if(this.dialogForm.get('name').value == ''){
      this.snackBar.open("Select a task.", "Dismiss", {duration: 3000});
    }else{
      let arLocal = JSON.parse(localStorage.getItem('task'));
      arLocal = arLocal ? arLocal : [];
      arLocal.push(this.dialogForm.get('name').value);
      localStorage.setItem('task',JSON.stringify(arLocal));
      this.snackBar.open("Task added to list", "Dismiss", {duration: 3000})
      this.dialogRef.close();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
