import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, Injectable, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
declare let Strophe: any;
declare let $msg: any;
declare let $pres: any;
declare let $iq: any;
declare let $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent implements OnInit{


searchText:any;
domain = environment.xmppDomain
chat: any;
//toJID = ""
ownerName = ""
imgurl:any;
USERNAME = "" 
  PASSWORD!: string | null;
ownerJID = localStorage.getItem("jid")
URL = "https://" + this.domain + "/http-bind";



  constructor( private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService) {
     
     }


  ngOnInit(): void {
    this.userData.get_image().subscribe((res:any)=>{
      if(res.error==false){
        this.imgurl = res.imageUrl;
        console.log('imgRes',res)
      }
    })

    if (localStorage.getItem('TOKEN') == null) {
      this.router.navigate(['/login']);
    }
    this.ownerName = localStorage.getItem('first_name') + " " + localStorage.getItem('last_name');
    this.PASSWORD = localStorage.getItem("TOKEN")
    this.USERNAME = this.ownerJID + "@" + this.domain
    var connection = new Strophe.Connection(this.URL);
    connection.connect(this.USERNAME, this.PASSWORD)

    Strophe.ui.conn = connection
    //this.scrollToBottom()
    
    
  }


}

