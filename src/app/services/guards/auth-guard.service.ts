import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem("token") == null || localStorage.getItem("token") == undefined) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
