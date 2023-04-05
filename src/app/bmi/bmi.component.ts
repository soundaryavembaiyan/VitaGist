import { Component, Inject, Injectable, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthComponent } from '../health/health.component';
import { A11yModule } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { Utils } from '../util';
import { ShareUpdateService } from '../share-update.service';

@Injectable()
@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})

export class BmiComponent implements OnInit {

 // @Input() device_list: any;
 // @Input() device_names: any;
  @Input() card_details: any;
 // @Input() device_card: any;
  bmi :any;
  weightunit:any;
  heightunit:any;
  height:any;
  weight:any;
  country:any;
  info:any;
  bmi_status:any;
  tag:any;
  card_image = "fas fa-exclamation-circle"
  style = 'font-size:10px;color:green'

/*
  dialogAdd() {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(DeviceAdd2Component, {
      width: '380px',
      height:'400px',
      data: [this.card_details, this.device_list, this.device_card],
    })
    console.log("DevList:", this.device_list)
    console.log("card_details dialog:", this.card_details)
  }
  */

  constructor(
    public dialog: MatDialog,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService,
    public change_stats:ShareUpdateService
    ) {  }

  ngOnInit(): void {

    //citizenship
    this.userData.get_document_page(this.tag).subscribe((res: any) => {
      if (res.error == false) {
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].index == "citizen_primary") {
            this.country = res.data[i].country
          }
        }
      }
    })

//profile
this.userData.profile_details().subscribe((res:any)=>{
  if(res){
  this.card_details = res[0];
  this.weight = res[0].weight;
  this.height = res[0].height;
  this.weightunit = res[0].weigthtUnit;
  this.heightunit = res[0].heightUnit;
  this.bmi = res[0].bmi;
  this.bmi_status = res[0].bmiStatus;

  this.display_status_icon(this.bmi_status)

  }
})


this.change_stats.status.subscribe((res:any)=>{
  if(res=="true"){
    this.userData.profile_details().subscribe((res:any)=>{
      if(res){
      this.card_details = res[0];
      this.weight = res[0].weight;
      this.height = res[0].height;
      this.weightunit = res[0].weigthtUnit;
      this.heightunit = res[0].heightUnit;
      this.bmi = res[0].bmi;
      this.bmi_status = res[0].bmiStatus;
    
      this.display_status_icon(this.bmi_status)
      }
       
    })

  }
})


    
  }

  display_status_icon(bmi_status: any){
    if(bmi_status){
      if(bmi_status=="NORMALWEIGHT"){
       this.card_image = "fa fa-check-circle"
       this.style = 'color:green;font-size:20px; position: absolute;'
 
      } else if(bmi_status=="OVERWEIGHT"){
       this.card_image = "fas fa-exclamation-circle"
        this.style = 'color:orange;font-size:20px; position: absolute;'
 
      } else if(bmi_status=="OBESE"){
       this.card_image = "fas fa-exclamation-circle"
        this.style = 'color:red;font-size:20px; position: absolute;'
 
      } else if(bmi_status=="UNDERWEIGHT"){
        this.card_image = "fas fa-exclamation-circle"
        this.style = 'color:red;font-size:20px; position: absolute;'
 
      }
    }
 
  }
}
