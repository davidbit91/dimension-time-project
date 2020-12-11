import { logging } from 'protractor';
import { AuthService } from './shared/services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy{
  title = 'dimension-time';
  loggedIn = false;
  authSubscription: Subscription;

  constructor(private auth: AuthService) {
    this.authSubscription = this.auth.isLogged$().subscribe((user) => {
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

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

