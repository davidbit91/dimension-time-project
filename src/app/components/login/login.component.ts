import { AuthService } from './../../shared/services/auth.service';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
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
      );
      this.router.navigate(['/home']);
    }
  }
}
