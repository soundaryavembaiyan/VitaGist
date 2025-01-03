import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {ChangeDetectionStrategy, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { HttpResponse } from '@angular/common/http';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DatePipe]
})
export class LoginComponent implements OnInit {
  //user_details: any;
  user_details = { email: "soundaryavembaiyan@gmail.com",  password: "Soundz@0404" }
  getYear: number = new Date().getFullYear();
  registerForm: any;
  public showPassword: any;
  public showPasswordOnPress: any;
  tdydate:any;
  today=new Date();
  reminder: any;
  //myForm:any;
  //matcher = new MyErrorStateMatcher();

constructor(private userData: UsersDataService,
  private router:Router,
  private toast: ToastrService,
  private datePipe: DatePipe, private dialog: MatDialog) { }

ngOnInit(): void {
  this.registerForm = new FormGroup({
    "email": new FormControl(" "),
    "password": new FormControl(" "),
    "action": new FormControl("login"),
    "logintype":new FormControl("email")
  });
  window.scrollTo(0, 0); 
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

//forgot pwd ul
toggleUnderline(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  target.classList.toggle('active');
}

get email() { return this.registerForm.get('email'); }
get password() { return this.registerForm.get('password'); }
get action() { return this.registerForm.get('login'); }
get logintype() { return this.registerForm.get('email'); }


openDialog(): void {
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    //data: {  },
    width: '500px',
    height: '255px',
    hasBackdrop: true,
    panelClass: 'hello',
    disableClose: true
  });

 dialogRef.afterClosed().subscribe((result:any) => {
  if (result) {
          
  }
});
}


}

@Component({
  selector: 'app-confirmation-dialog',
  template: `
  <div mat-dialog-content>
  <div class="closeDialog">
        <i class="fa fa-times closeBtn" (click)="closeDialog()" aria-hidden="true"></i>
  </div>

   <h1 mat-dialog-title class="mailoption">Forgot Password?</h1>
   <form [formGroup]="myForm">
        <div class="signForm-row " id="email_input">
            <div class="input-group" style="margin-top: 30px;">
              <span class="input-group-text" id="basic-addon1"><i class="fa fa-envelope"></i></span>
              <input #email formControlName='email' name="email" class="form-control" id='id_email' type="text" placeholder="Enter you email" aria-describedby="basic-addon1"/>
            </div>
          <div *ngIf="f['email'].errors && submitted" class="text-danger">
            <div *ngIf="f['email'].errors['required']">This field is required</div>
            <div *ngIf="f['email'].errors['pattern']">Invalid Email</div>
            <div *ngIf="f['email'].errors['msg']">{{ f['email'].errors['msg'] }}</div>
          </div>
          </div><br>

        <div class="signForm-row" style="text-align:end">
              <!-- <button (click)="onSubmit(email.value)" class="submit-button">Submit</button> -->
              <button mat-raised-button class="subbutton" (click)="onSubmit(email.value)" style="vertical-align:middle">
              <p class="loginBtn">
                <span> Submit</span>
              </p>
            </button>
        </div>
   </form>
   </div>
`,
  styleUrls: ['./login.component.css']
})
export class ConfirmationDialogComponent {
  editDoc: any;
  selectedOption: any;
  submitted = false;
  myForm = this.formBuilder.group({
		email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]]
	})

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private toast: ToastrService,private userData: UsersDataService,
    private router:Router, public dialogRef: MatDialogRef<ConfirmationDialogComponent>) { }

  ngOnInit() {
      //console.log('selectedOption',this.selectedOption)
      //localStorage.removeItem('validationDone');
  }

  get f() { return this.myForm.controls; }

  onSubmit(email: string) {
    this.submitted = true;
    if (this.myForm.invalid) {
      return;
    }
    this.userData.forgot_password(email).subscribe((res: HttpResponse<any>) => {
      console.log('res',res)
      if (res.body.error === false) {
        //this.router.navigate(['/reset-password']);
        //this.data.changeCofferId(res.body.coffer_id);
        this.toast.success(res.body.msg, 'Success!');
        this.dialogRef.close()
      } else {
        this.toast.error(res.body.msg, 'Error!');
      }
    });
  }

  closeDialog() {
    this.dialogRef.close()
  }

}