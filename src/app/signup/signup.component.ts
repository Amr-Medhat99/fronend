import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm:FormGroup=new FormGroup({
    'firstName':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    'lastName':new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,Validators.required),
  });

  registerFormData(data:any){
    if (data.valid==true) {
      console.log(data);
      data.addControl('type', new FormControl("", Validators.required));
      data.controls['type'].patchValue('customer');
      this._AuthService.register(data.value).subscribe({
        next:(data)=>this._Router.navigate(['/login']),
        error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  constructor(public _AuthService:UsersService,public _Router:Router) { }

  ngOnInit(): void {
  }

}
