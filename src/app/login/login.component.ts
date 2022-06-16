import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '../services/users.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup=new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,Validators.required),
  });

  

  login(data:any){
      if (data.valid==true) {
        console.log(data);
        this._AuthService.login(data.value).subscribe({ //[1] set a token to user who looged in , go to users.service.ts
          next:(data)=>{
            console.log(data);
            this._AuthService.id=data._id;
            localStorage.setItem('token', data.data.token);
            const tokenInfo = this.getDecodedAccessToken(data.data.token); // decode token
            const userType = tokenInfo.type; // get token expiration dateTime
            
            if (userType==="profile_admin") {
              this._Router.navigate(['/adminManageProduct']);
            }else if(userType==="profile_customer"){
              this._Router.navigate(['/home']);
            }
          },
          error:(error)=>{
            // handle unauthorized error
            if(error instanceof HttpErrorResponse){
              if(error.status === 401){
                this._Router.navigate(['/login'])
              }
            }
          }
        })
      }
      else{
        console.log('error');
        console.log("an error occure");
      }
    }
  constructor(public _AuthService:UsersService,public _Router:Router) { }

  ngOnInit(): void {
  }

  //this function for decode token
  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
}
