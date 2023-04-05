import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.css']
})
export class AuditComponent implements OnInit {
  audit: any;
  searchText:any;

  constructor( private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.userData.get_audit().subscribe((result: any) => {
      this.audit = result.data
      //this.audit = result.data.audits
      console.log('result', this.audit);

      if(result.error==false){
        //create new var and call
        let AT = result.data.events
        this.audit = AT.reverse();
       }
    });

  }
}
