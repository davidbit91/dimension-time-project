import { Subscription } from 'rxjs';
import { AuthService } from './../../shared/services/auth.service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if(this.formGroup.get('email').value != '' &&  this.formGroup.get('password').value != ''){
      this.auth.login(
        this.formGroup.get('email').value,
        this.formGroup.get('password').value
      )
      .then(() => this.router.navigate(['/home']))
      .catch(err => this.snackBar.open(err.message,'Dismiss',{duration: 3000}));
    }
  }
}
