import { Subscription } from 'rxjs';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { iUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  user: iUser;
  loggedIn = false;
  sub: Subscription;
  constructor(private auth: AuthService) {
    this.isLoading = true;
    this.sub = this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }
}
