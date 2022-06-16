import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UsersService } from './services/users.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorTokenService {

  constructor( private _userService: UsersService) { }
  // [6] create an interceptor to deal with the request and handle response
  // then i will register this interceptor service in the app module by
    // - import http-interceptor
    // - import the interceptor-token service and put it in providers as an object
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    // transform request
    let theToken = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this._userService.fetchToken()}`
      }
    })
    // handle response
    return next.handle(theToken);
    // then i will handle the error in login.ts page
  }
}
