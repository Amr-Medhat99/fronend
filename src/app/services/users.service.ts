import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( public _HttpClient:HttpClient, private _router:Router) { }
  email:string="";
  id:any;
  register(data:any):Observable<any>
  {
    this.email=data.email;
    return this._HttpClient.post("https://thewinnerteam10.herokuapp.com/api/auth/register",data);
  }
  login(data:any):Observable<any>
  {
    return this._HttpClient.post("https://thewinnerteam10.herokuapp.com/api/auth/login",data);
  }
  confirmEmail(data:any):Observable<any>
  {
    return this._HttpClient.post("https://thewinnerteam10.herokuapp.com/api/auth/verify-otp",data);
  }
  resendConfirmEmail(email:any):Observable<any>
  {
    return this._HttpClient.post("https://thewinnerteam10.herokuapp.com/api/auth/resend-verify-otp",email);
  }
  // [2] fuction to get the token of the user to use it in authentication
  isLogged(){
    if(localStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }  // after that i created guard file called auth and use this method inside it , go to auth.guard.ts

  //[5] a method that fetch the token value
  fetchToken(){
    return localStorage.getItem('token')
  }// then i will use this method in interceptor token service

  // create logout function to use it in logout button in navbar.html
  logout(){
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  // get data from products api
  fetchProducts(){
    return this._HttpClient.get("https://fakestoreapi.com/products");
  }

  fetchCategories(){
    return this._HttpClient.get("https://fakestoreapi.com/products/categories");
  }

  getSpecificCategory(cat:string){
    return this._HttpClient.get('https://fakestoreapi.com/products/category/'+cat);
  }

  getProductDetails(id:any){
    return this._HttpClient.get("https://fakestoreapi.com/products/"+id);
  }

  createCart(model:any){
    return this._HttpClient.post('https://fakestoreapi.com/carts', model)
  }

  getCart(id:any){
    return this._HttpClient.get("https://fakestoreapi.com/carts/user/"+id)
  }
}
