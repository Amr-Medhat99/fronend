import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CURDAdminService {

  constructor(public _HttpClient:HttpClient) { }

  addProduct(data:any):Observable<any>
  {
    return this._HttpClient.post('https://thewinnerteam10.herokuapp.com/api/crud/product/',data);
  }

  deleteProduct(id:any):Observable<any>
  {
    return this._HttpClient.delete('https://thewinnerteam10.herokuapp.com/api/crud/product/'+id);
  }

  updateProduct(data:any,productID:any):Observable<any>
  {
    return this._HttpClient.put('https://thewinnerteam10.herokuapp.com/api/crud/product/'+productID,data);
  }

  getAllProduct():Observable<any>
  {
    return this._HttpClient.get('https://thewinnerteam10.herokuapp.com/api/crud/product/');
  }
}
