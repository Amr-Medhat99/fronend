import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  products:any = []
  numOfProducts:any;
  search:boolean = false

  constructor(public _userService: UsersService) { }

  ngOnInit(): void {
    this.getNumOfItemsInCart()
  }

  getNumOfItemsInCart(){
    this.products = JSON.parse(localStorage.getItem("cart")!)
    this.numOfProducts = this.products.length
  }


}
