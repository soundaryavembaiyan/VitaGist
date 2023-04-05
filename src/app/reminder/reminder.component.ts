import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})

@Injectable()
export class ReminderComponent implements OnInit {
  message: any;
  target: any;
  data:any;
  isPopupOpened: any;
  dialogRef: any;
  add_details: any;
  created: any;
  id: any;
  reminder:any;
  searchText:any;

  constructor( private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService) { }

    addDialog(){
      this.isPopupOpened = true;  
      const dialogRef = this.dialog.open(AddComponent,  {
        width: '450px',
        disableClose: true
      });
    }

    // add_reminder(msg,targetdate){
      deleteCard(id: any){
          this.userData.delete_reminders(id).subscribe((res:any)=>{
            if(res.error == false){
              this.userData.get_reminders().subscribe((res:any)=>{
                if(res.error==false){
                  this.toast.success("Reminder deleted successfully.")
                  window.location.reload()
                 } 
                else{
                   this.toast.error("Reminder deleted Unsuccessfully.")
                    }
              })
            }
          })
    }

  ngOnInit(): void {

      this.userData.get_reminders().subscribe((result: any) => {
      this.reminder = result.data.reminders
      console.log('result', this.reminder);
    });
  }
}


//Add Reminder component 
@Component({
  selector: 'app-add',
  templateUrl: './add.html',
 // styleUrls: ['./reminder.component.css'],
  providers: [DatePipe]
})

export class AddComponent {

  dialog: any;
  result: any;
  myForm: any;
  docid: any;
  details: any;
  submitted: any;
  message: any;
  target:any;
  add_details:any;
  rs:any;
  reminder: any;
  created: any;
  id: any;
  datenew: any;
  date:any;
  msg:any;

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService,
    private datePipe: DatePipe,
    private fb: FormBuilder) 
    {
   
    }
    
  ngOnInit() {
    this.myForm = this.fb.group({
      "message": new FormControl(),
      "target": new FormControl()
    });
  }

  //add Reminders
  submitData(data:any){

    this.submitted=true;
    let date=this.myForm.value.target
    this.datenew = this.datePipe.transform(date,'dd-MM-YYYY')

    this.userData.add_reminders(this.myForm.value.message,this.datenew).subscribe((result: any) => {
      //console.log(this.data);

      if (result.error == false) {
        this.toast.success("Reminder created Successful");
        
        this.userData.get_reminders().subscribe((res:any)=>{
          this.reminder = result.reminder
          console.log('result', this.reminder);
        })
        this.dialogRef.close();
        //this.router.navigate(['/reminder'])
        window.location.reload()
      }
      else {
        this.toast.error("Reminder Failed");
        //console.log(this.reminder);
      }
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }
}


