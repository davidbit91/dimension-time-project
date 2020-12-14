import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { iUser } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  user: iUser;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private firestore: FirestoreService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validator: this.matchPassword('password', 'rPassword'),
    });
  }
  onSubmit() {

    this.auth.register(
      this.formGroup.get('email').value,
      this.formGroup.get('password').value
    );

    this.user = {
      id: 'a',
      email: this.formGroup.get('email').value,
      name: this.formGroup.get('name').value,
      tasks: []
    };
    this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.user.id = user.uid;
        this.firestore.create(this.user);
      }
    });

    this.router.navigate(['/home']);
  }

  matchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors.passwordMismatch) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

}
