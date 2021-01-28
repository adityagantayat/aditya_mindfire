import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from '../shared/passwordMatch';
import swal from 'sweetalert2';

@Component({
  selector: 'app-RegisterForm',
  templateUrl: './RegisterForm.component.html',
  styleUrls: ['./RegisterForm.component.scss']
})
export class RegisterFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  
  // registrationForm=new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   dateOfbirth: new FormControl(''),
  //   phoneNumber1: new FormControl(''),
  //   phoneNumber2: new FormControl('')

  // }); 
  user: any= {};
  usersData: any=[];
  isUpdate:boolean=false;
  isNotValid:boolean=false;
  isEligible: boolean=true;
  selectedIndex=-1;
  users:String[]=[];
  submitOrUpdateText: string ="";

  registrationForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
    lastName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
    email: ['', [Validators.required,  Validators.pattern("[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
    password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(16),Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$")]],
    confirmPassword: ['', [Validators.required]],
    dateOfbirth: ['', [Validators.required]],
    phoneNumber1: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
    phoneNumber2: ['', [Validators.pattern("^[0-9]{10}$")]],
    gender: ['', Validators.required],
    language1: [''],
    language2: [''],
    language3: [''],
    language4: [''],
    course: ['', Validators.required]
  },{ validator: PasswordValidator });
  get firstName() {
    return this.registrationForm.get('firstName');
  }
  get lastName() {
    return this.registrationForm.get('lastName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }
  get phoneNumber1() {
    return this.registrationForm.get('phoneNumber1');
  }
  get dateOfbirth() {
    return this.registrationForm.get('dateOfbirth');
  }
  get phoneNumber2() {
    return this.registrationForm.get('phoneNumber2');
  }
  get gender() {
    return this.registrationForm.get('gender');
  }
  get language() {
    return this.registrationForm.get('language');
  }
  get course() {
    return this.registrationForm.get('course');
  }
  ngOnInit() {
    this.usersData = JSON.parse(localStorage.getItem("Users") || '{}');
  }
  onSubmit(){    
    if (this.registrationForm.valid){
      this.isUpdate=false;
      this.isNotValid=false;

      this.users=[];
      this.user=Object.assign(this.user,this.registrationForm.value);
      // this.addUser(this.user);
      if(this.selectedIndex==-1){
        if(localStorage.getItem('Users')){
          this.users= JSON.parse(localStorage.getItem('Users') || '{}');
          this.users=[...this.users,this.user];
        }
        else{
          this.users=[this.user];
        }
        this.submitOrUpdateText = "Succesfully Submitted!";
      }
      else{
        if(localStorage.getItem('Users')){
          this.users= JSON.parse(localStorage.getItem('Users') || '{}');
          this.users.splice(this.selectedIndex,1,this.user);
        }
        else{
          this.users=[this.user];
        }
        this.submitOrUpdateText = "Succesfully Updated!";
      }
      
      localStorage.setItem('Users',JSON.stringify(this.users));
      this.registrationForm.reset();
      this.selectedIndex=-1;
      swal.fire('Done', this.submitOrUpdateText, 'success');
    }
    else {
      this.isNotValid=true;
      swal.fire('Oops..', 'Please fill in all required fields', 'warning');
    }
    this.loadData();
  }
  deleteUserData(i:number){
    swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this record!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
        this.users= JSON.parse(localStorage.getItem('Users') || '{}');
        this.users.splice(i,1);
        localStorage.setItem('Users',JSON.stringify(this.users));
        this.loadData();
        
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === swal.DismissReason.cancel) {
        swal.fire(
          'Cancelled',
          'Your record is safe ',
          'error'
        )
      }
    })    
  }
  validateDOB(){
    let year = new Date(this.dateOfbirth?.value).getFullYear();
    let today = new Date().getFullYear();
    if(today - year >= 12){
        this.isEligible=false;
    }
    else{
      this.isEligible=true;
    }
    // console.log(this.isEligible);
    // console.log(year);
    // console.log(today);
  }
  loadData(){
    this.usersData = JSON.parse(localStorage.getItem("Users") || '{}');
  }
  editUserData(i:number){
    this.isUpdate=true;
    this.selectedIndex=i;
    console.log(this.usersData[i]);
    this.registrationForm = this.fb.group({
    firstName: [this.usersData[i].firstName,[Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
    lastName: [this.usersData[i].lastName, [Validators.required, Validators.pattern("^[a-zA-Z]+$")] ],
    email: [this.usersData[i].email, [Validators.required,  Validators.pattern("[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")] ],
    password: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(16),Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$")]],
    confirmPassword: ['', [Validators.required] ],
    dateOfbirth: [this.usersData[i].dateOfbirth, [Validators.required] ],
    phoneNumber1: [this.usersData[i].phoneNumber1, [Validators.required, Validators.pattern("^[0-9]{10}$")] ],
    phoneNumber2: [this.usersData[i].phoneNumber2, [Validators.pattern("^[0-9]{10}$")]],
    gender: [this.usersData[i].gender, Validators.required ],
    language1: [this.usersData[i].language1],
    language2: [this.usersData[i].language2],
    language3: [this.usersData[i].language3],
    language4: [this.usersData[i].language4],
    course: [this.usersData[i].course, Validators.required ]
    },{ validator: PasswordValidator })
  }

}
