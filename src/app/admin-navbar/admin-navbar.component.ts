import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styles: [
  ]
})
export class AdminNavbarComponent implements OnInit {

  constructor(private _Router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    localStorage.removeItem('token')
    this._Router.navigate(['/login'])
  }

}
