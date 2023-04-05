import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
  providers: [DatePipe]
})
export class SideBarComponent implements OnInit {
  docs: any;
  data:any;
  relation: any;
  tdydate: any;
  reminder: any;
  today=new Date();

  constructor( private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService,
    private datePipe: DatePipe,) { }

  ngOnInit(): void {

    //Relationship API..
    this.userData.get_home(this.data).subscribe((result: any) => {
      this.relation = result.data
      console.log('result', this.relation);
    });

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

  reload(){
    this.ngOnInit()
  }

  
  

}
