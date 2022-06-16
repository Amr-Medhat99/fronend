import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  id:any
  product:any = {}
  cart:any[] = [];
  add:boolean = false
  amount:number = 1;
  loader:boolean = true

  constructor(private route:ActivatedRoute, private _userService:UsersService) {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  ngOnInit(): void {
    this.getSingleProduct()
  }

  getSingleProduct(){
    this.loader = true
    this._userService.getProductDetails(this.id).subscribe((res)=>{
      console.log(res)
      this.product = res;
      this.loader = false
    }, (error)=>{
      this.loader = false
      console.log(error)
    })
  }

  addToCart(){
    if("cart" in localStorage){
      this.cart = JSON.parse(localStorage.getItem("cart")!)
      let alreadyIn = this.cart.find(Item => Item.item.id == this.product.id)
      if(alreadyIn){
        alert("product is already in your cart")
      }else{
        this.cart.push({item : this.product, quantity:this.amount})
        localStorage.setItem("cart", JSON.stringify(this.cart))
        alert("Added Successfully")
      }
    }else{
      this.cart.push({item : this.product, quantity:this.amount})
      localStorage.setItem("cart", JSON.stringify(this.cart))
      alert("Added Successfully")
    }
  }

}
