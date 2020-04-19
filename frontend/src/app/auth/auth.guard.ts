import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    const userRole = this.authService.getRole();
    if (isAuth) {

      for (const r in route.data.roles) {
        if (route.data.roles.hasOwnProperty(r)) {
          const element = route.data.roles[r];
          // console.log(element, '=', userRole);
          if (element === userRole) {
            return true;
          }
        }
        // return false;
      }
      this.router.navigate(['']);
      return false;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
