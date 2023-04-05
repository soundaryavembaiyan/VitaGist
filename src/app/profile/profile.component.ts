import { Component, Inject, Injectable, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [DatePipe]
})
export class ProfileComponent implements OnInit {
  isDisabled!: boolean;
  child: any;
  profile_id: any;
  myForm: any;
  ethnicity_list: any;
  tag: any;
  citizen: any;
  profile_page: any;
  @Input() id: any;
  bloodgrp_list: any;
  profile: any;
  hide = true;
  datenew: any;

  constructor( private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private datePipe: DatePipe,
    private router:Router,
    private toast: ToastrService) { }

  profile_details:any;
  checkoutForm:any;
  isOpen = false;

  Gender = [
    { value: '', name: 'Select Gender' },
    { value: 'female', name: 'Female' },
    { value: 'male', name: 'Male'},
    { value: 'others', name: 'Others'},
  ];

  Ethnicity= [
    { value: '', name: 'Select Ethnicity' },
    { value: 'american indian', name: 'American Indian' },
    { value: 'asian', name: 'Asian' },
    { value: 'hispanic or latino', name: 'Hispanic or Latino' },
    { value: 'native hawaiian or other pacific islander', name: 'Native Hawaiian or Other Pacific Islander' },
    { value: 'white', name: 'White' },
  ];

  Blood = [
    { value: '', name: 'Select Blood Group' },
    { value: 'a +ve', name: 'A +ve' },
    { value: 'a -ve', name: 'A -ve' },
    { value: 'b +ve', name: 'B +ve' },
    { value: 'b -ve', name: 'B -ve' },
    { value: 'ab +ve', name: 'AB +ve' },
    { value: 'ab -ve', name: 'AB -ve' },
    { value: 'o +ve', name: 'O +ve' },
    { value: 'o -ve', name: 'O -ve' },

  ];

  ngOnInit(): void {

          this.myForm = this.formBuilder.group({
            first_name:[''],
            middle_name:[''],
            last_name:[''],
            mobile:[''],
            email:[''],
            password:[''],
            //country:[''],
            //gender:[''],
            //ethnicity:[''],
            //height:[''],
            //weight:[''],
            //bloodGroup:[''],
            dob:['', this.datenew],
          });

    let date=this.myForm.value.dob
    this.datenew = this.datePipe.transform(date,'dd-MM-YYYY')

  
    //profile..
    this.userData.get_profile_sign().subscribe((result: any) => {
      if (result.error == false) {
        this.profile_details = result.data
        //this.profile = results[0].data
        console.log("result", this.profile_details)
        console.log("result", this.profile)
      }
    })


    //health profile..
  /*  this.userData.profile_details().subscribe((result: any) => {
      //setting id..
      this.profile_id = result[0].id;
      this.profile_details = result[0]
      //console.log("result", this.profile_details)
      //console.log("result", this.profile_id)

    }) */

        //citizenships..
        this.userData.get_document_page(this.tag).subscribe((result:any)=>{
          if(result.error==false){
            this.citizen = result
            console.log(this.citizen)
          }
        })
    
        this.userData.get_ethnicity().subscribe((result:any) =>{
          this.ethnicity_list = result
          console.log(this.ethnicity_list)
        })
    
        this.userData.get_bloodgrps().subscribe((result:any) =>{
          this.bloodgrp_list = result
          console.log(this.bloodgrp_list)
        })
       
       /* get_date_value(date){
          return moment(date,"MM-DD-YYYY").format();
        }*/
}


 //Healt profile SAVE!! 
saveMe(id: any){

  this.userData.update_digicoffer_profile(this.myForm.value).subscribe((res:any)=>{
    if(res.error==false){
      this.toast.success("Profile Updated Succesfully..")
    }
    else{
      this.toast.error("Updated Failed..")
    }
       
        //window.location.reload()
        //this.router.navigate(['/side-bar'])
  
})

//Healt profile API..
/*
this.userData.profile_details().subscribe((result: any) => {
  //setting id..
    this.profile_id = result[0].id;
    this.profile_details=result[0]
   // console.log("result", this.profile_details)
    //console.log("result", this.profile_id)
}) */

}

}