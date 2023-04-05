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

@Injectable()
@Component({
  selector: 'app-three-card',
  templateUrl: './three-card.component.html',
  styleUrls: ['./three-card.component.css']
})
export class ThreeCardComponent implements OnInit {

  @Input() device_list: any;
  @Input() device_names: any;
  @Input() card_details: any;
  @Input() device_card: any;
  card_image: any;
  medium_value: any;
  high_value: any;
  value_: any;
  values_: any;
  device_type: any;
  latest: any;
  values: any;
  valuesx: any;
  images:any;
  isPopupOpened: any;
  //card_image: any;
  medium_value1: any;
  high_value1: any;
  medium_value2: any;
  high_value2: any;
  medium_value3: any;
  high_value3: any;
  vpulse:any[]=[];
  vsys:any[]=[];
  vdia:any[]=[];
  xais:any[]=[];

  dialogAdd() {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(DeviceAdd2Component, {
      width: '400px',
      height:'400px',
      data: [this.card_details, this.device_list, this.device_card],
    })
    console.log("DevList:", this.device_list)
    console.log("card_details dialog:", this.card_details)
  }

  constructor(
    public dialog: MatDialog,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService
    ) {  }

  ngOnInit(): void {

    this.userData.get_chartreading(this.card_details.device.systemId).subscribe((res:any)=>{
      this.vpulse = res.map((res:  any)=>res.value1)
      this.vsys = res.map((res: any)=>res.value2)
      this.vdia = res.map((res: any)=>res.value3)
      this.xais = res.map((res: any)=>res.readingDateTime)
      console.log('val',this.value_)
    })

    this.device_names.forEach((element:any) => {
      if(element.systemId == this.card_details.device.systemId){
        this.card_image = element.image;
      }
    });

    this.userData.healthy_range().subscribe((res:any)=>{
      res.forEach((element: any) => {
        if(element.systemId == this.card_details.device.systemId){
          this.medium_value1 = element.dataWatch.data1.medium;
          this.high_value1 = element.dataWatch.data1.high;
          this.medium_value2 = element.dataWatch.data2.medium;
          this.high_value2 = element.dataWatch.data2.high;
          this.medium_value3 = element.dataWatch.data3.medium;
          this.high_value3 = element.dataWatch.data3.high;
        }
      });

      this.device_type = res;
      console.log('deviceType',this.device_type)
    })
  
    this.userData.lastest_device_reading().subscribe((res: any) => {
      this.latest = res;
      console.log('latest',this.latest)
    })
    
  }
}


@Component({
  selector: 'app-device-add2',
  templateUrl: './device-add2.html',
  styleUrls: ['./three-card.component.css'],
  providers: [DatePipe]
})
export class DeviceAdd2Component implements OnInit {
  reg_device: any;
  device: any;
  device_names: any;
  addedDevices:any;
  id: any;
  device_card: any;
  tag_list: any;
  a:any;
  cat_id: any;
  latest: any;
  last_updated: any;
  device_id: any;
  card_details: any;
  maxDate: any;
  date1 = new FormControl(new Date());
  minute_value = new Date().getMinutes().toString();
  ampm_list = ["AM", "PM"];
  am_pm =  new Date().getHours()>12? "PM": "AM";
  hour_value =  Utils._12_hour_format();
  counter = Array;
  lastReading: any;
  submitted: any;
  tag_id = 0;
  device_reading: any;
  selected_device: object[] = [];
  share: any;
  tdydate:any;
  today=new Date();
  valueUnit1:any;
  valueUnit2:any;
  valueUnit3:any;
  device_list: any;
  
  constructor( 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeviceAdd2Component>,
    private userData: UsersDataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    public datePipe :DatePipe) { 
      this.device_card = data[0];
     // this.device_reading = data[1];
     // this.card_details = data[1];
      this.device_list = data[1];
    

      console.log("device_card Consturctor:", this.device_card)
      //console.log("device_reading Consturctor:", this.device_reading)
      console.log("card_details Consturctor:", this.card_details)
      console.log("device_list Consturctor:", this.device_list)
    }

  myForm = this.formBuilder.group({
    
    'firstReading': new FormControl(),
    'secondReading': new FormControl(),
    'thirdReading': new FormControl(),
    "dateSelected": new FormControl(),
    "hour_value": new FormControl(),
    "minute_value": new FormControl(),
    "am_pm": new FormControl()

  });


  ngOnInit() {
    //catid API.  //device_names - catid
    this.userData.get_tag_list(this.card_details.device.category.id).subscribe((res: any) => {
      this.tag_list = res
      this.tag_id = res[0]?.id;
    })

    //Last readings!.
    this.userData.data_last_reading().subscribe((res: any) => {
      res.forEach((element: any) => {
        if (element.device__systemId == this.card_details.device.systemId) {
          if (element.daySince > 0) {
            this.last_updated = `${element.daySince} days ago`
          } else if (element.daySince == 0) {
            this.last_updated = `Today`
          }
        }
      });
      console.log('last_updated', this.last_updated)
    })

    this.selected_device = this.device_reading.filter((element: any) => {
      if (element.systemId == this.card_details.device.systemId) {
        this.device_id = element.id;
        return true
      } else {
        return false
      }
    });

  }

  //mat-chip-list tag id
  tag_btn(tag_id: number){
    this.tag_id = tag_id
  }

/*

  save_data(value1: any, date: any, hour: any, minute: any, am_pm: any, valueUnit1: any){
    this.submitted = true;

    let device = this.device_card.id;
    let tagId = this.tag_id;
    let sequence = 0;
    let value2 = 0;
    let value3 = 0;
    let valueUnit2 = 0;
    let valueUnit3 = 0;

   
    if (minute.length == 1) {
      minute = `0${minute}`
    }

    var readingDateTime;

    if (date == "") {
      date = Utils.formatDate();
      readingDateTime = `${date}`;
    } 
    else {
      let DateTime = `${date}, ${hour}:${minute} ${am_pm}`
      readingDateTime = this.datePipe.transform(DateTime, "MM-dd-yyyy hh:mm a")
    }

    
      this.userData.add_device_reading(device, sequence, readingDateTime, Number(value1), value2, value3, valueUnit1, valueUnit2, valueUnit3, tagId).subscribe((res: any) => {
        this.toast.success('Reading created successfully.')

        this.card_details.device.id = res;
        console.log('Card_details:',res)

       
        this.userData.lastest_device_reading().subscribe((res: any) => {
          this.latest = res;
          console.log('latest',this.latest)
        
        })

        let date_new = this.datePipe.transform(this.today, 'YYYYMMdd');
        this.userData.get_activitylog_date(date_new).subscribe((result: any) => {
          this.tdydate = result;
          console.log(this.tdydate)
        });

        this.dialogRef.close()
      })
    



  }*/

  save_data(value1: any, value2: any, value3: any, date: any, hour: any, minute: any, am_pm: any, valueUnit1: any, valueUnit2: any, valueUnit3: any){
    //let device = this.device_id;
    let device = this.device_card.device.id;
    let tagId = this.device_card.tag_id
    let sequence = 0;
    this.submitted = true;
    
    //console.log(typeof(value1))
    if(minute.length == 1){
      minute = `0${minute}`
    }

    var readingDateTime;
     
    if(date == ""){
      date = Utils.formatDate();
      readingDateTime = `${date}`;
    } else {
      let DateTime = `${date}, ${hour}:${minute} ${am_pm}`
      readingDateTime = this.datePipe.transform(DateTime , "MM-dd-yyyy hh:mm a")
    
    }

      if(value1 && value2 && value3 && value1 >= '10' && value2 >= '10' && value3 >= '10'){
        this.userData.add_device_reading(device, sequence, readingDateTime, Number(value1), Number(value2), Number(value3), valueUnit1, valueUnit2, valueUnit3, tagId).subscribe((res: any) => {
          //console.log(res);
          this.toast.success('Reading created successfully.')

          this.userData.lastest_device_reading().subscribe((res: any) => {
            this.latest = res;
            console.log('latest_device_reading', this.latest)
          })

          let date_new = this.datePipe.transform(this.today, 'YYYYMMdd');
          this.userData.get_activitylog_date(date_new).subscribe((result: any) => {
            this.tdydate = result;
            console.log(this.tdydate)
          });
          

          this.dialogRef.close()
        })
      } else {
         this.toast.error('Please fill the required field.')
      }
  }


  closeDialog() {
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}
