import { Component, Inject, Injectable, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  profile_details: any;
  profile: any;

  constructor( private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,) { }

  ngOnInit(): void {
    this.userData.get_profile_sign().subscribe((result: any) => {
      if (result.error == false) {
        this.profile_details = result.data
        //this.profile = results[0].data
        console.log("result", this.profile_details)
        console.log("result", this.profile)
      }
    })
  }

}
