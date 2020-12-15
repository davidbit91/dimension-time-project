import { FirestoreService } from './../../shared/services/firestore.service';
import { Subscription } from 'rxjs';
import { AuthService } from './../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  sub: Subscription;
  constructor(private auth: AuthService, private firestore: FirestoreService) {
    this.isLoading = true;
    this.sub = this.auth.isLogged$().subscribe((user) => {
      if (user && user.uid) {
        this.loggedIn = true;
        this.firestore.getUserById$(user.uid).subscribe(user => this.user = user);
      } else {
        this.loggedIn = false;
      }
      this.isLoading = false;
    });
  }

  ngOnInit(): void {}
}
