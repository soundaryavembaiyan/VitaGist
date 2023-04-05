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
import * as uuid from 'uuid';
import { Utils } from '../util';
import { CommunicationService } from '../communication.service';


@Injectable()
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  isPopupOpened: any;
  dialogRef: any;
  device: any;
  cards:any;
  addedDevices:any;
  @Input() card_details: any;
  @Input() device_list: any;
  
  device_names = [
    {title: 'Blood Glucose',data_type: 'single', unit: {title: ['Blood Glucose'], unit: ['mg/dl']}, device_type: 'BGDEVICE', systemId: '0x1808' , image: ['fas fa-tint'], category: 2, flag: false}, 
    {title: 'Blood Oxygen', data_type: 'single', unit: {title: ['Blood Oxygen'], unit: ['SpO2%']}, device_type: 'BODEVICE', systemId: '0x1822',  image: ['fas fa-lungs'], category: 4, flag: false}, 
    {title: 'Blood Pressure', data_type: 'three', unit: {title: ['Systolic', 'Diastolic', 'Pulse'], unit: ['mm Hg','mm Hg', 'bpm']}, device_type: 'BPDEVICE', systemId: '0x1810',  image: ['fas fa-heartbeat'], category: 3, flag: false}, 
    {title: 'Weight', data_type: 'single', unit: {title: ['Weight'], unit: ['Kg']}, device_type: 'WEIGHSCALEDEVICE', systemId: '0x181D', image: ['fas fa-weight'], category: 6, flag: false}, 
    {title: 'Temperature', data_type: 'single', unit: {title: ['Temperature'], unit: ['Fahrenheit']}, device_type: 'THERMODEVICE', systemId: '0x1809', image: ['fa fa-thermometer-half'], category: 5, flag: false}
  ]

  id: any;
  deviceid: any;
  update_dr:any;
  systemId: any;
  

  constructor(
    public dialog: MatDialog,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService
    ) {  }

  deviceDialog(){
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(AddDeviceComponent, {
      width: '380px',
      //height:'400px',
      data: [this.device_names, this.device],
      
    })
    console.log("DevNames",this.device_names)
    console.log("Dev..",this.device)
  }

  deleteDialog(id: any){
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(DeleteDialogComponent,  {
      width: '350px',
      data: [id],
      disableClose: true
    })
    console.log(id)
  }


  
  ngOnInit() {

    this.userData.device_list().subscribe((res: any) => {
      this.device = res;
      this.addedDevices = this.device;
      console.log("d", this.device)
      console.log("Devices", this.addedDevices)

      //Image icon..
      this.addedDevices.forEach((element: any) => {
        this.device_names.forEach(item => {
          if (item.systemId == element.systemId) {
            element['image'] = item.image;
          }
        });
      });
    })
    

  }

  closeDialog() {
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.html',
  styleUrls: ['./devices.component.css']
})
export class AddDeviceComponent implements OnInit {

  myForm2:any;
  device: any;
  submitted: any;
  final_list: any[]=[];
  device_names: any;
  added:any;
  reg_device: any;
  addedDevices: any;
  _communicationService: any;
  id: any;
  myModel = true;
  devicez: any;
  myForm:any;

  constructor( 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDeviceComponent>,
    private userData: UsersDataService,
    private formBuilder: FormBuilder,
    private toast: ToastrService) { 
   
     this.device_names = data[0]
     this.device = data[1]

    }

  ngOnInit() {
 
    this.userData.device_list().subscribe((res: any) => {
      this.device = res;
      this.addedDevices = this.device;
      console.log(this.device)
      console.log(this.addedDevices)

    })    
    this.myForm = this.formBuilder.group({
      'Blood Glucose': new FormControl(false),
      'Blood Oxygen': new FormControl(false),
      'Blood Pressure': new FormControl(false),
      'Weight': new FormControl(false),
      'Temperature': new FormControl(false)
    });
    /*
   this.myForm2 = this.formBuilder.group({
      "name": new FormControl(),
      "category":new FormControl(),
      "serviceUid":new FormControl(),
      "manufacturer":new FormControl(), 
      "systemId":new FormControl(),
      "modelNumber":new FormControl(),
      "serialNumber":new FormControl(),
      "isBLE":new FormControl(),
      "paired":new FormControl()
    });
    */
  }

 //name, category, serviceUid, manufacturer, systemId, modelNumber, serialNumber, isBLE, paired, status
 //this.name, this.category, this.serviceUid, this.manufacturer, this.systemId, this.modelNumber, this.serialNumber, this.isBLE, this.paired, this.status

  saveDevices() {
    this.submitted = true;

    Object.keys(this.myForm.value).forEach(element => {
      if(this.myForm.value[element]){
        this.final_list.push(element)
        let name = uuid.v4();  //uuid - generate a new id(adding device)
        let manufacturer = uuid.v4();
        let category = 0;
        let serviceUid = uuid.v4();
        let systemId = ''
        let modelNumber = 1234;
        let serialNumber = 1234;
        let isBLE = true;
        let paired = false;
        let status = "OFFLINE";
  
        this.device_names.forEach((item: any) => {
          if(item.title==element){
            category = item.category;
            systemId = item.systemId;
            console.log('cat',category)
            console.log('sysId',systemId)
          }
        });
  
  
      this.userData.add_new_device(name, category, serviceUid, manufacturer, systemId, modelNumber, serialNumber, isBLE, paired, status).subscribe((res: any) => {
        this.toast.success('New Device Added');
       /* this.userData.device_list().subscribe((res: any) => {
          this.device = res;
          this.addedDevices = this.device;
          console.log('res', this.addedDevices)
          console.log('devNames', this.device_names)
        })*/
      window.location.reload()
      });
      }

    }); //obj.key

    console.log('fin',this.final_list)
    console.log('ddd',this.device_names)
    console.log('myForm',this.myForm.value)
    let selected = this.myForm.value

    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.html',
  styleUrls: ['./devices.component.css']
})
export class DeleteDialogComponent implements OnInit {
  reg_device: any;
  device: any;
  device_names: any;
  addedDevices:any;
  id: any;
  _communicationService: any;

  constructor( 
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private userData: UsersDataService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: ToastrService) { 

         this.id = data[0]
    }


  ngOnInit() {
    this.userData.device_list().subscribe((res: any) => {
      this.device = res;
      this.addedDevices = this.device;
      console.log(this.device)
      console.log(this.addedDevices)
    })
  }


  OnDeleteDevice(id: any) {

    this.userData.delete_device(id).subscribe((res: any) => {
      if (res.error == false) {
        
        this.userData.device_list().subscribe((res: any) => {
          this.device = res;
          this.addedDevices = this.device;
          console.log(this.device)
          console.log(this.addedDevices)

        })
    }
    window.location.reload()
    })
  
    console.log(this.id) //id
    this.closeDialog()
    this.toast.success("Device Deleted Successfully")
    
  }

 

  closeDialog() {
    this.dialogRef.close()
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}


