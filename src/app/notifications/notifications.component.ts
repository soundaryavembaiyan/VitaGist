import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notify: any;
  _communication: any;
  id:any;
  notifications: any;
  searchText:any;

  constructor( private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService) { }

    //data:any;
    searchTerm = '';

    readNotify(id: any){
      this.userData.read_notifications(id).subscribe((result: any) => {
        if(result.error == false){
          this.userData.get_notifications().subscribe((result:any)=>{
            if(result.error==false){
              this.toast.success("Notification readed successfully.")
              window.location.reload()
             } 
          })
        }
      })
    }


    deleteNotify(id: any){
      this.userData.delete_notifications(id).subscribe((res:any)=>{
        if(res.error == false){
          this.userData.get_notifications().subscribe((res:any)=>{
            if(res.error==false){
              this.toast.success("Notification deleted successfully.")
              window.location.reload()
             } 
            else{
                  this.toast.error("Notification deleted Unsuccessfully.")
                }
          })
        }
      })
}

  ngOnInit(): void {
    this.userData.get_notifications().subscribe((result: any) => {
    this.notify = result.data.notifications
    console.log('result', this.notify);

  });
}



}
