import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
   
    
  }

}
