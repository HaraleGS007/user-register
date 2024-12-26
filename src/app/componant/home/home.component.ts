import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  showPassword: boolean = false;
  user_Form: FormGroup;
data:any;
submitted = false;
  userData:any = [];
  constructor(private fb: FormBuilder, private http: ApiService) {
    this.user_Form = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
          ),
        ],
      ],
      confirmPassword:['', [Validators.required]],
      dateOfBirth: ['', [Validators.required]],

    },
    
    { validators: this.passwordMatchValidator });
   

this.userData = this.http.get_userData().subscribe({
  next:(res:any)=>{
    console.log(res)
    this.userData = res;
  }
})

// 

  }

  allempData(){
    this.http.get_userData().subscribe({
      next:(res:any)=>{
        this.userData = res;
      }
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.user_Form.controls;
  }
  Onsave(){

    this.submitted = true;
    if (this.user_Form.invalid) {
      return;
    }

    console.log(this.user_Form.value)

    const frmVal = this.user_Form.value;

    const postData:any ={
      fullName:frmVal.fullName,
      email:frmVal.email,
      password:frmVal.password,
      gender:frmVal.gender,
      confirmPassword:frmVal.confirmPassword,
      dateOfBirth:frmVal.dateOfBirth,
    }
       this.http.add_userData(postData).subscribe({
        next:(res:any)=>{
          console.log(res)
          alert('Form Data add Sucessfully !!')
          this.user_Form.reset();
          this.allempData()
        },
        error(err){
          alert('Form Data not Send !!')
        }
       })

  }

  Onreset(){
this.user_Form.reset()
  }

  deleteData(emp:any){
    this.http.delete_userData(emp.id).subscribe({
      next:(res:any)=>{
        console.log(res)
        alert('Record Deleted !!')
        this.allempData()
      },
      error(){
        alert("No Delete Data !!")
      }
    })

  }

  editepmData(data:any){
    this.data = data;
    if (this.data?.id) {
      this.user_Form.patchValue(this.data);
    }
  }


  updateData(data:any){

    const frmVal = this.user_Form.value;
    const postdata:any = {
      full_name:frmVal.full_name,
      email:frmVal.email,
      password:frmVal.password,
      gender:frmVal.gender,
      confirmPassword:frmVal.confirmPassword,
      dateOfBirth:frmVal.dateOfBirth,
    }

    this.http.update_userData(postdata, data.id).subscribe({
      next:(res:any)=>{
        console.log(res)
        alert('Record Updated !!')
        this.allempData()
      },
      error(){
        alert("No Update Record !!")
      }
    })
  }

// 

togglePasswordVisibility() {
  this.showPassword = !this.showPassword;
}

passwordMatchValidator(group: FormGroup) {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password === confirmPassword ? null : { passwordMismatch: true };
}

}



