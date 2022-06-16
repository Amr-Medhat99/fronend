import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {BrandService} from '../services/brand.service'
@Component({
  selector: 'app-admin-brands',
  templateUrl: './admin-brands.component.html',
  styles: [
  ]
})
export class AdminBrandsComponent implements OnInit {

  constructor(public _BrandService:BrandService) {
    this.getAllBrand();
  }
normal:boolean=true;
find:boolean=false;
  ngOnInit(): void {
    //this.getAllBrand();
  }
  updateButton:boolean=false;
  addButton:boolean=true;
  brandID:any;
  allBrands:Array<any>=[];
  BrandForm:FormGroup=new FormGroup({
    'title':new FormControl(null,[Validators.required]),
  });

  addBrand(data:any){
    if (data.valid==true) {
      this._BrandService.addBrand(data.value).subscribe({
      next:(data)=>{this.brandID=data.data._id;this.getAllBrand();this.BrandForm.reset()},
      error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  updateBrand(data:any){
    if (data.valid==true) {
      this._BrandService.updateBrand(data.value,this.brandID).subscribe({
        next:(data)=>{console.log('update success');this.updateButton=false;this.addButton=true;this.getAllBrand();this.find=false;this.normal=true;this.BrandForm.reset()},
        error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  deleteBrand(id:any){
    if(window.confirm('Are you sure to delete this Brand?'))
    {
      console.log(id)
    if (id!=null) {
      this._BrandService.deleteBrand(id).subscribe({
        next:(data)=>{console.log('delete success');this.getAllBrand();this.find=false;this.normal=true;},
        error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
    }
  }

  getAllBrand(){
    this._BrandService.getAllBrands().subscribe({
      next:(data)=>{console.log('get all success');this.allBrands=data.data;console.log('b',this.allBrands)},
      error:(error)=>console.log(error)
    })
  }

  brandFind:Array<any>=[];

  search(event:any){
    this.brandFind=[];
    for (let i = 0; i < this.allBrands.length; i++) {
      if (this.allBrands[i].title.toLowerCase().includes(event.target.value.toLowerCase())) {
        //this.allBrands.push(this.allBrands[i]);
        this.brandFind.push(this.allBrands[i]);
        this.find=true;
        this.normal=false;
      }
    } 
    console.log(this.brandFind)
  }
  fillForm(data:any){
    this.BrandForm.controls['title'].setValue(data.title);
    this.brandID=data._id;
    this.updateButton=true;
    this.addButton=false;
  }
}
