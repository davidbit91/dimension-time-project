import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedIn = false;
  constructor(private auth: AuthService) {
    this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
    console.log('HOME');
    console.log(this.loggedIn);
  }

  ngOnInit(): void {}
}
