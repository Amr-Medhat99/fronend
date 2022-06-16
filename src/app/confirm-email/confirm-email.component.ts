import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(public _AuthServices:UsersService,public _Router:Router) { }

  ngOnInit(): void {
  }
  data:any={email:null,otp:null};
  onlyEmail:any={email:null};
  confirmEmail(){
    this.data.otp=(<HTMLInputElement>document.getElementById("otpCode")).value;
    if(this.data.otp!=""){
      this.data.email=this._AuthServices.email;
      this.data.otp=(<HTMLInputElement>document.getElementById("otpCode")).value;
      console.log(this.data);
      this._AuthServices.confirmEmail(this.data).subscribe({
      next:(d)=>{console.log(d);this._Router.navigate(['/login'])},
      error:(err)=>console.log(err)
    })
    }else{
      alert("enter otp code")
    }
  }

  resendConfirmEmail(){
      this.onlyEmail.email=this._AuthServices.email;
      console.log("fin",this.onlyEmail.email);
      this._AuthServices.resendConfirmEmail(this.onlyEmail).subscribe({
      next:(d)=>{console.log(d),alert("resend successfully")},
      error:(err)=>console.log(err)
  })

}
}
