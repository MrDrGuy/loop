/*
*Document Author: Joey Queppet
*Last Updated: 11/1/2018
*
*Takes advantage of the authguard ability of Angular,
 * yet to be used as the nav auth works fine so far.
 * will delete if not needed.
*/

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    //state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean // origional
    state: RouterStateSnapshot): Observable<boolean> |  boolean {

  return this.auth.user.pipe(
    take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
           console.log('access denied')
           this.router.navigate(['/login-page']);
        }
         }))
  }


}
