import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor(public _HttpClient:HttpClient) { }

    
    updateProfile(data:any,id:any):Observable<any>
    {
      return this._HttpClient.put('https://thewinnerteam10.herokuapp.com/api/auth/profile/update/'+id,data);
    }
}