import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productsInCart:any = [];
  message:string = '';
  total:number = 0;
  loader:boolean = true;
  tempArray:any = [];
  constructor() { }

  ngOnInit(): void {
    this.getProductsInCart();
  }

  getProductsInCart(){
    this.loader = true;
    if("cart" in localStorage){
      this.tempArray = JSON.parse(localStorage.getItem("cart")!)
      if(this.tempArray.length >= 1){
        this.productsInCart = JSON.parse(localStorage.getItem("cart")!)
        console.log(this.productsInCart)
        this.getTotalPrice();
      }else{
        this.message = "no items in Cart";
      }
    }else{
      this.message = "no items in Cart";
    }
    this.loader = false
  }

  getTotalPrice(){
    this.total = 0
    for(let i = 0; i < this.productsInCart.length; i++){
      this.total += this.productsInCart[i].item.price * this.productsInCart[i].quantity
    }
  }

  decrease(index:number){
    this.productsInCart[index].quantity--
    if(this.productsInCart[index].quantity < 1){
      this.productsInCart[index].quantity = 1
      return
    }else{
      localStorage.setItem("cart", JSON.stringify(this.productsInCart))
      this.getTotalPrice()
    }
  }

  increase(index:number){
    if(this.productsInCart[index].quantity >= this.productsInCart[index].item.rating.count){
      alert('Out Of Stock')
      return
    }else{
      this.productsInCart[index].quantity++
      localStorage.setItem("cart", JSON.stringify(this.productsInCart))
      this.getTotalPrice()
    }
  }

  change(index:number){
    if(this.productsInCart[index].quantity < 1){
      alert("please type a valid quantity")
      this.productsInCart[index].quantity = 1
      localStorage.setItem("cart", JSON.stringify(this.productsInCart))
      this.getTotalPrice()
    }else if(this.productsInCart[index].quantity >= this.productsInCart[index].item.rating.count){
      alert('Out Of Stock , the all amount is ' + this.productsInCart[index].item.rating.count)
      this.productsInCart[index].quantity = this.productsInCart[index].item.rating.count
      localStorage.setItem("cart", JSON.stringify(this.productsInCart))
      this.getTotalPrice()
    }else{
      localStorage.setItem("cart", JSON.stringify(this.productsInCart))
      this.getTotalPrice()
    }
  }

  delete(index:number){

    this.productsInCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(this.productsInCart))
    this.getTotalPrice()
    if(this.productsInCart.length < 1){
      this.message = "no items in Cart";
    }
  }


}
