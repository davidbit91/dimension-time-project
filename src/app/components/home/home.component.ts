import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { iUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  user: iUser;
  loggedIn = false;
  constructor(private auth: AuthService) {
    this.isLoading = true;
    this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      this.isLoading = false;
    });
    console.log('HOME');

  }

  ngOnInit(): void {}
}
