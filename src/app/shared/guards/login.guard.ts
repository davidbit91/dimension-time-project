import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  async canActivate() {
    const user = await this.authService.isLogged$().toPromise();
    console.log(user)
      if (user && user.id) {
        return true;
      }
      else {
        console.log("entra aquí")
        this.router.navigate(['/home']);
        return false;

      }
  }
}
