import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private _userService: UsersService) { }
  userId:any;
  message:string = ''
  cartProducts:any = []
  products:any = {}
  success:boolean = false
  total:number = 0;
  empty:boolean = false;

  ngOnInit(): void {
    this.getUserId()
    this.getCartProducts()
    this.getTotalPrice()
  }

  getUserId(){
    this.userId = localStorage.getItem("token")
  }

  getCartProducts(){
    if("cart" in localStorage){
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!)
      console.log(this.cartProducts)
    }else{
      this.message = 'There is nothing in cart'
    }
  }

  getTotalPrice(){
    this.total = 0
    for(let i = 0; i < this.cartProducts.length; i++){
      this.total += this.cartProducts[i].item.price * this.cartProducts[i].quantity
    }
    if(this.total == 0){
      this.empty = true
    }else{
      this.empty = false
    }
  }

  addCart(){
    let products = this.cartProducts.map((item: { item: { id: any; }; quantity: any; }) => {
     return {productId: item.item.id, quantity: item.quantity}
    })
    let Model = {
      userId : 1,
      date : new Date(),
      products: products
    }
    this._userService.createCart(Model).subscribe(res => {
      this.success = true
      setTimeout(() => {
        this.success = false
      }, 3000);
    }, error =>{
      console.log(error)
    })

  }

}
