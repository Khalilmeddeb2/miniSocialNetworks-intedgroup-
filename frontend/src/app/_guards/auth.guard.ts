import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userSevice: UserService , private router :Router) { }

  canActivate() :boolean {
    if(this.userSevice.loggedIn() ){
    return true
   }
   else
   {
    this.router.navigate(['/connexion'])
    return false
   }
  }
    
  }
  

