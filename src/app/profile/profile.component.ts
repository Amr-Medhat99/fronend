import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {ProfileService} from '../profile.service'
import { UsersService } from '../services/users.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _ProfileService:ProfileService,private _UsersService:UsersService) { }

  ngOnInit(): void {
  }
  profileForm:FormGroup=new FormGroup({
    'firstName':new FormControl(null,[Validators.required]),
    'lastName':new FormControl(null,[Validators.required]),
    'email':new FormControl(null,[Validators.required]),
    'mobile':new FormControl(null,[Validators.required]),
    'age':new FormControl(null,[Validators.required]),
  });
  updateProfile(data:any){
    if (data.valid==true) {
      console.log(data);
      this._ProfileService.updateProfile(data.value,this._UsersService.id).subscribe({ //[1] set a token to user who looged in , go to users.service.ts
        next:(data)=>{
          alert('update success')
        },
        error:(error)=>
          // handle unauthorized error
          console.log(error)
      })
    }
    else{
      console.log('error');
      console.log("an error occure");
    }
  }

}
