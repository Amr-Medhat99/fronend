import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public _HttpClient:HttpClient) { }

  addCategory(data:any):Observable<any>
  {
    return this._HttpClient.post('https://thewinnerteam10.herokuapp.com/api/crud/cats/',data);
  }

  deleteCategory(id:any):Observable<any>
  {
    return this._HttpClient.delete('https://thewinnerteam10.herokuapp.com/api/crud/cats/'+id);
  }

  updateCategory(data:any,catID:any):Observable<any>
  {
    return this._HttpClient.put('https://thewinnerteam10.herokuapp.com/api/crud/cats/'+catID,data);
  }

  getAllCategory():Observable<any>
  {
    return this._HttpClient.get('https://thewinnerteam10.herokuapp.com/api/crud/cats/');
  }
}
