import { ActivatedRoute } from '@angular/router';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  id:any;
  orders:any = []
  products:any = []
  allProducts:any = []
  productsId:any = []

  constructor( private route: ActivatedRoute ,private _userService: UsersService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.getOrders()
  }

  // first get product id
  // fetch products by id from userservice
  // store it in array

  getOrders(){
    this._userService.getCart(this.id).subscribe(res=>{
      this.orders = res
      this.allProducts = this.orders[this.orders.length - 1].products
      this.allProducts.map((item: { productId: []; }) => {
        console.log(item.productId)
        this.productsId += item.productId
      })
      console.log(this.productsId)
    }, error =>{
      console.log(error)
    })
  }

}
