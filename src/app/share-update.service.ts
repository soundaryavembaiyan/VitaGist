import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareUpdateService {
  share=false
  status: BehaviorSubject<any>;

  constructor() {
    this.status  = new BehaviorSubject(this.share);
   }
   change_status(status: any){
     this.status.next(status)

   }
}
