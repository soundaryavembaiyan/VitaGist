import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  

//Geting user details:
  user_details: any;
  //user_details={ email: "soundaryavembaiyan@gmail.com",  password: "Soundz@0404" }
  anio: number = new Date().getFullYear();
  registerForm: any;
  public showPassword: any;
  public showPasswordOnPress: any;
  tdydate:any;
  today=new Date();
  reminder: any;

constructor(private userData: UsersDataService,
  private router:Router,
  private toast: ToastrService,
  private datePipe: DatePipe,) { }

ngOnInit(): void {
  this.registerForm = new FormGroup({
    "email": new FormControl(" "),
    "password": new FormControl(" "),
    "action": new FormControl("login"),
    "logintype":new FormControl("email")
  });


}

//login_api
submitData(data: any){
//Login API..
  this.userData.login_sign(data).subscribe((result: any) => {
    
  if (result.error==false){
    localStorage.setItem('TOKEN', result.token); 
    localStorage.setItem('PK',result.data.pk)
    
    this.toast.success("Login Successful")
    this.router.navigate(['/side-bar'])
    
  }
  else{
    this.toast.error("Check your login details")
  }
  })

  
//Today Date API..
let date_new =  this.datePipe.transform(this.today,'YYYYMMdd');
this.userData.get_activitylog_date(date_new).subscribe((result: any) => {
  this.tdydate = result;
  console.log(this.tdydate)
});

//Reminders API..
this.userData.get_reminders().subscribe((result: any) => {
  this.reminder = result.data;
  console.log(this.reminder)
});


}

get email() { return this.registerForm.get('email'); }
get password() { return this.registerForm.get('password'); }
get action() { return this.registerForm.get('login'); }
get logintype() { return this.registerForm.get('email'); }
}
