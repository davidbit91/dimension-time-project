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
  private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required]
    });

  }

  onSubmit(){
    let arLocal = JSON.parse(localStorage.getItem('task'));
    arLocal = arLocal ? arLocal : [];
    arLocal.push(this.dialogForm.get('name').value);
    localStorage.setItem('task',JSON.stringify(arLocal));
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
