/*import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    const user = this.authService.isLogged$().pipe(
      tap(user => {
        if (user && user.id) {
          return true;
        } else {
          this.router.navigate(['/home']);
          return false;
        }
      })
    )
    .subscribe()
  }
}

*/
