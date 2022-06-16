import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {CategoryService} from '../services/category.service'

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  constructor(public _CategoryService:CategoryService) {
    this.getAllCategory();
  }
normal:boolean=true;
find:boolean=false;
  ngOnInit(): void {}
  updateButton:boolean=false;
  addButton:boolean=true;
  categoryID:any;
  allCategory:Array<any>=[];

  categoryForm:FormGroup=new FormGroup({
    'title':new FormControl(null,[Validators.required]),
  });

  addCategory(data:any){
    if (data.valid==true) {
      this._CategoryService.addCategory(data.value).subscribe({
      next:(data)=>{this.categoryID=data.data._id;this.getAllCategory();this.categoryForm.reset()},
      error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  updateCategory(data:any){
    if (data.valid==true) {
      this._CategoryService.updateCategory(data.value,this.categoryID).subscribe({
        next:(data)=>{console.log('update success');this.updateButton=false;this.addButton=true;this.getAllCategory();this.find=false;this.normal=true;this.categoryForm.reset()},
        error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  deleteCategory(id:any){
    if(window.confirm('Are you sure to delete this Category?'))
    {
      console.log(id)
      if (id!=null) {
        this._CategoryService.deleteCategory(id).subscribe({
          next:(data)=>{console.log('delete success');this.getAllCategory();this.find=false;this.normal=true;},
          error:(error)=>console.log(error)
        })
      }
      else{
        console.log('Error');
      }
    }
  }

  getAllCategory(){
    this._CategoryService.getAllCategory().subscribe({
      next:(data)=>{console.log('get all success');this.allCategory=data.data;},
      error:(error)=>console.log(error)
    })
  }

  categoryFind:Array<any>=[];

  search(event:any){
    this.categoryFind=[];
    for (let i = 0; i < this.allCategory.length; i++) {
      if (this.allCategory[i].title.toLowerCase().includes(event.target.value.toLowerCase())) {
        
        this.categoryFind.push(this.allCategory[i]);
        this.find=true;
        this.normal=false;
      }
    } 
  }
  
  fillForm(data:any){
    this.categoryForm.controls['title'].setValue(data.title);
    this.categoryID=data._id;
    this.updateButton=true;
    this.addButton=false;
  }
}
