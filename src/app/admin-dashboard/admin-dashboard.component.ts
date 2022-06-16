import { Component, OnInit,EventEmitter, Input,Output } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import {CURDAdminService} from '../services/curdadmin.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { S3ImgUploaderService } from 'src/app/services/s3-img-uploader.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  normal:boolean=true;
  find:boolean=false;
  loadingHeight: number = 0;
  fileContent: FileList | undefined;
  imgLocation: string = '';
  allImage:Array<any>=[];
  imgSrc: string | ArrayBuffer = '';
  @Input('imgSrc') localStorageImg: string = '';
  @Output() imageLocationEvent = new EventEmitter<string>();
  loading: boolean = false; // Flag variable
  done: boolean = false; // Flag variable

  file: any // Variable to store file
  updateButton:boolean=false;
  addButton:boolean=true;
  allProduct:any;
  productID:any;
  // Inject service 
  constructor(private fileUploadService: FileUploadService,private _CURDAdminService:CURDAdminService,private s3ImgUploaderService: S3ImgUploaderService) {
    this.getAllProduct();
  }

  
  ngOnInit(): void {
    this.getAllProduct();
    this.imgSrc = this.localStorageImg;
    this.imgLocation = this.localStorageImg;
  }

  onChange($event: any) {
    this.done=false;
    this.loading=true;
    const fileReader = new FileReader();
    this.fileContent = $event.target.files[0];
    
    this.upload();
    fileReader.readAsDataURL($event.target.files[0]);
    fileReader.onload = () => {
      this.imgSrc = fileReader.result ? fileReader.result : '';
    };
    $event.target.value=null;
  }

  async upload() {

		let file = this.fileContent;
    let that = this;
    if(file){
		await new Promise((resolve) =>
			this.s3ImgUploaderService.uploadFile(file).on('httpUploadProgress', function (e) {

        that.loadingHeight = 100 - Math.round(100.0 * (e.loaded / e.total));

      }).send((err: any, data: any) => {
				if (err) {
					console.log('There was an error update Saved your file: ', err);
					return false;
				}
        else if (data) {
					
          this.imgLocation = data.Location
          this.allImage.push(data.Location);
          console.log("allimage",this.allImage);
          this.imageLocationEvent.emit(this.imgLocation)
          this.loading=false;
          this.done=true;
					return true;

				}
        return true;
			}),
		);
	}
}


  productForm:FormGroup=new FormGroup({
    'title':new FormControl(null,[Validators.required]),
    'category':new FormControl(null,[Validators.required]),
    'price':new FormControl(null,[Validators.required]),
    'description':new FormControl(null,[Validators.required]),
    'brand':new FormControl(null,[Validators.required]),
  });

  addProduct(data:any){
    data.addControl('image', new FormControl("", Validators.required));
    data.controls['image'].patchValue(this.allImage);
    if (data.valid==true) {
      this._CURDAdminService.addProduct(data.value).subscribe({
      next:(data)=>{console.log('success');this.getAllProduct();this.allImage=[];this.productForm.reset()},
      error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  updateProduct(data:any){
    data.addControl('image', new FormControl("", Validators.required));
    data.controls['image'].patchValue(this.allImage);
    
    if (data.valid==true) {
      console.log(data);
      this._CURDAdminService.updateProduct(data.value,this.productID).subscribe({
        next:(data)=>{console.log('update success');this.updateButton=false;this.addButton=true;this.getAllProduct();this.allImage=[];;this.find=false;this.normal=true;this.productForm.reset()},
        error:(error)=>console.log(error)
      })
    }
    else{
      console.log('Error');
    }
  }

  deleteProduct(id:any){
    if(window.confirm('Are you sure to delete this Product?')){
      if (id!=null) {
        console.log(id)
        this._CURDAdminService.deleteProduct(id).subscribe({
          next:(data)=>{console.log('success');this.getAllProduct();this.find=false;this.normal=true;},
          error:(error)=>console.log(error)
        })
      }
      else{
        console.log('Error');
      }
    }
  }

  getAllProduct(){
    this._CURDAdminService.getAllProduct().subscribe({
      next:(data)=>{console.log('get all success');this.allProduct=data.data;console.log(this.allProduct)},
      error:(error)=>console.log(error)
    })
  }
  productFind:Array<any>=[];

  search(event:any){
    this.productFind=[];
    for (let i = 0; i < this.allProduct.length; i++) {
      if (this.allProduct[i].title.toLowerCase().includes(event.target.value.toLowerCase())) {
        this.productFind.push(this.allProduct[i]);
        this.find=true;
        this.normal=false;
      } 
    }
  }

  fillForm(data:any){
    console.log(data);
    this.productForm.controls['title'].setValue(data.title);
    this.productForm.controls['category'].setValue(data.category);
    this.productForm.controls['price'].setValue(data.price);
    this.productForm.controls['description'].setValue(data.description);
    this.productForm.controls['brand'].setValue(data.brand);
    this.productID=data._id;
    this.updateButton=true;
    this.addButton=false;
  }
  

}
