import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

/* 
import { Router } from '@angular/router'; */

@Injectable({
  providedIn: 'root'
})
export class CommonGuard implements CanActivate {

  constructor(private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if(window.localStorage.getItem('auth_token')) {
            return true
        } else {
            return this.router.navigate(['auth']);
        }
    }
}
