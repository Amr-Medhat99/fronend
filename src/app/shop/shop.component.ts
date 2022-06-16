import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './../services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  products:any[] = [];
  categories:any[] = [];
  loader:boolean = true

  constructor(private _http: HttpClientModule, public _userService: UsersService) { }

  ngOnInit(): void {
    this.getSpecificProducts();
    this.getCategories();
  }

  getSpecificProducts(){
    this.loader = true
    this._userService.fetchProducts().subscribe((res:any)=>{
      this.products = res;
      this.loader = false
      console.log(res)
    }, error=>{
      this.loader = false
      console.log(error)
    })
  }

  getCategories(){
    this.loader = true
    this._userService.fetchCategories().subscribe((res:any)=>{
      this.categories = res;
      this.loader = false
    })
  }

  chooseCategory(event:any){
    this.products = [];
    this.loader = true
    let value = event;
    console.log(value);
    this.getCategory(value)
    this.loader = false
  }
  getCategory(word:string){
    this._userService.getSpecificCategory(word).subscribe((res:any)=>{
      this.products = res
    })
  }

}
