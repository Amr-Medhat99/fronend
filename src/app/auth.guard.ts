import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private _userService: UsersService, private _router:Router){}

  //[3] i will use this function in routing app module to prevent the users who didn't loggedin from go through pages
  canActivate(): boolean{
    if(this._userService.isLogged()){
      return true
    }else{
      this,this._router.navigate(['/login'])
      return false
    } // after that i imported the auth guard in app module and add it in providers
  } // then go to app-routing.module


}
