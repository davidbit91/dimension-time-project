import { logging } from 'protractor';
import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dimension-time';
  loggedIn = false;

  constructor(private auth: AuthService) {
    this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      console.log(this.loggedIn);
      console.log('APP');
    });
  }

  ngOnInit(): void {}
}
