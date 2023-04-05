import { Component, Inject, Injectable, OnInit, Input, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { ActivatedRoute, Router } from '@angular/router';
declare let $: any

@Injectable()
@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {

  @Input() card_image: any;
  searchText:any;
  careplan: any;
  profileinfo:any;
  tag='careplanlist/';
  tagg='healthdashboard/';
  //info_tag='ethnicity/';
  care_plan: any;
  carePlan: any;
  id: any;
  countries: any;
  ethnicity_list: any;
  bloodgrp_list: any;
  profile: any;
  get_dob: any;
  add_details: any;
  health_profile: any;
  citizen: any;
  profile_page: any;
  window:any;
  profile_id:any;
  profile_details: any;
  relation: any;
  device: any;
  device_read: any;
  connection: any;
  device_type: any;
  data: any;
  latest: any;
  latested:any;
  item:any;
  height_len:any;
  device_names = [
    {title: 'Blood Glucose',data_type: 'single', unit: {title: ['Blood Glucose'], unit: ['mg/dl']}, device_type: 'BGDEVICE', systemId: '0x1808' , image: ['fas fa-tint', 'color: #f75b5b'], category: 2, flag: false}, 
    {title: 'Blood Oxygen', data_type: 'single', unit: {title: ['Pulse'], unit: ['SpO2%']}, device_type: 'PULSEDEVICE', systemId: '0x1822',  image: ['fas fa-lungs', 'color: #4c7dfe'], category: 4, flag: false}, 
    {title: 'Blood Pressure', data_type: 'three', unit: {title: ['Systolic', 'Diastolic', 'Pulse'], unit: ['mm Hg','mm Hg', 'bpm']}, device_type: 'BPDEVICE', systemId: '0x1810',  image: ['fas fa-heartbeat', 'color: #ed3b3b'], category: 3, flag: false}, 
    {title:  'Weight', data_type: 'single', unit: {title: ['Weight'], unit: []}, device_type: 'WEIGHSCALEDEVICE', systemId: '0x181D', image: ['fas fa-weight', 'color: #52b8c4'], category: 6, flag: false}, 
    {title: 'Temperature', data_type: 'single', unit: {title: ['Temperature'], unit: ['Fahrenheit']}, device_type: 'THERMODEVICE', systemId: '0x1809', image: ['fa fa-thermometer-half', 'color: #f9f44f'], category: 5, flag: false},
    ];
  device_list:any[]=[];
  wtunit: any;
  isClassExpand = false;
  device_selected: any;
  ReadMore:boolean = true

  //hiding info box
  visible:boolean = false


  //onclick toggling both
  onclick()
  {
    this.ReadMore = !this.ReadMore; //not equal to condition
    this.visible = !this.visible
  }


  constructor( public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService) { }

    open_bottom_dialog($event: any){
      if(this.device_list.length == 0 || !this.device_list){
   
      }
      $event.stopPropagation();
      this.isClassExpand = !this.isClassExpand;
    }
    @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
      this.isClassExpand = false;
    }

    


    ngOnInit(): void {
      //Profile API..
         this.userData.get_profile_sign().subscribe((res:any)=>{
           this.profile_page = res.data;
           console.log(this.profile_page)
         })


      this.userData.profile_details().subscribe((res: any) => {
        this.height_len = res[0]?.weigthtUnit

        if (res = []) {
          this.userData.get_document_page(this.tag).subscribe((res: any) => {
            if (res.error == false) {
              for (let i = 0; i < res.data.length; i++) {

                if (res.data[i].index == "citizen_primary" && (res.data[i].country == "USA" || res.data[i].country == "united states of america")) {
                  this.device_names.find(item => item.title == "Weight")


                } else {
                  this.wtunit = "kg"
                }
              }

            }
          })

        } else {
          this.wtunit = res[0]?.weigthtUnit
        }
      })


     
     //Health profile API..
     this.userData.profile_details().subscribe((result: any) => {
         this.profile_id = result[0].id;
         this.profile_details=result[0]
         console.log("result", this.profile_details)
         console.log("result", this.profile_id)
     }) 
     
     //Citizenship..
         this.userData.get_document_page(this.tag).subscribe((result:any)=>{
           if(result.error==false){
             this.citizen = result
             console.log(this.citizen)
           }
         })
     
     //Relationship API..
         this.userData.get_home(this.data).subscribe((result: any) => {
           this.relation = result.data
           console.log('result', this.relation);
         });
     
     //Devices list..
         this.userData.device_list().subscribe((res:any)=>{
          this.device_list.forEach(element => {
            this.device_names.forEach(item => {
              if(item.systemId == element.systemId){
                element['image'] = item.image;
                // //console.log(element['image'])
              }
            });
          });

console.log('DevList..',this.device_list)
     })
     
     //Device reading..
     this.userData.device_reading().subscribe((res:any)=>{
       this.device_read = res;
       console.log(this.device_read)
     })
     
     //Entity API..
         this.userData.relationship_list().subscribe((result: any) => {
           this.connection = result.data.relationships;
           console.log('result', this.connection);
         });
     
     //CareplanList
         this.userData.get_care_plan().subscribe((result: any) => {
           this.care_plan = result;
           console.log('result', this.care_plan)
         })  
     
     //Device reading..
     this.userData.healthy_range().subscribe((res:any)=>{
       this.device_type = res;
       console.log(this.device_type)
     })
     
     //Device type=DEVICE..
     this.userData.get_category("DEVICE").subscribe((result: any) => {
       this.device_type = result;
       console.log(this.device_type)
     });
     
      //Latest Device..
     this.userData.lastest_device_reading().subscribe((res: any) => {
      this.latest = res;
      console.log('latest',this.latest)
    })
     
     }
     

//Health cards...
 get_tags(tag:any){
  this.tag=tag
  if(tag=="careplanlist/") 
      this.userData.get_care_plan().subscribe((result: any) => {
        this.tag = result.data.pk
        console.log('result', this.tag);
      });
      
}

/*
get_tago(tagg:any){
  //this.tag=tag
  if(this.tagg=="healthdashboard/") 
      this.userData.profile_details().subscribe((result: any) => {
        this.tagg = result.pk
        console.log('result', this.tagg);
      });
    }*/

/*
  get_tags(tag: any){       
    console.log(tag)
    this.tag=tag
    if(tag=="careplanlist/")  //Careplan
    { 
      this.userData.get_care_plan().subscribe((result: any) => {
        console.log(tag)
        this.tag=tag;
        this.careplan=result.data;
        console.log('result', this.careplan); 

      });
     }
   else{   //Personal 
      this.userData.get_relationship_bytag(tag).subscribe((result: any) => {
        console.log(tag)
        this.tag=tag;
        this.connection=result.data.relationships;
        console.log('result', this.relationships); 
      });
    } }
*/
  

}



@Component({
  selector: 'app-careplan',
  templateUrl: './careplan.html',
  styleUrls: ['./health.component.css']
})
export class CareplanComponent{

  searchText:any;
  parentid: any;
  q: any;
  care_plan: any;
  submitted: any;
  goal: any;
  diet: any;
  exercise: any;
  med: any;
  @Input() id:any;
  goalType:any;
  presentText:any;

  constructor( public dialog: MatDialog,
    private userData: UsersDataService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router:Router,
    private toast: ToastrService) { 
      
    }


  ngOnInit(): void {
    this.userData.get_care_plan().subscribe((result: any) => {
      this.care_plan = result;
      console.log('result', this.care_plan)
    })

  }



}

@Component({
  selector: 'app-viewcareplan',
  templateUrl: './viewcareplan.html',
  styleUrls: ['./health.component.css']
})


export class ViewCareplanComponent implements OnInit{

  searchText:any;
  tag: any;
  med: any;
  exercise: any;
  diet: any;
  goal: any;
  q: any;
  parentid:any;
  isPopupOpened: any;
  careId:any;
  pId:any;
  cId: any;
  blockUI: any;
  goalType:any;
  care_plan: any;
  presentText:any;
  @Input() id:any;
  @Input() category: any;
  

    constructor( public dialog: MatDialog,
      private formBuilder: FormBuilder,
      private http: HttpClient,
      private route: ActivatedRoute,
      private userData: UsersDataService,
      private router:Router,
      private toast: ToastrService) {
       //this.id = data[0]
       }


    openDialog() {
      this.isPopupOpened = true;     //dialog 
      const dialogRef = this.dialog.open(ExerciseDialogComponent,  {
        width: '450px',
        //height: '400px',
        data:[this.id]
        //disableClose: true
      });
    }

    editDialog(id: any){
      this.isPopupOpened = true;     //dialog 
      const dialogRef = this.dialog.open(ExerciseEditComponent,  {
        width: '450px',
       // height: '440',
        data:[id]
        //disableClose: true
      });
    }

    deleteDialog(id:any){
      this.isPopupOpened = true;     //dialog 
      const dialogRef = this.dialog.open(ExerciseDeleteComponent,  {
        width: '300px',
        data:[id]
        //disableClose: true
      });
    }

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get("id"); //url mapping..

    this.userData.get_care_plan_id(this.id).subscribe((result:any)=>{ 
      this.parentid = result.parentPlan;
      if(this.parentid){
        this.userData.get_questions(this.parentid).subscribe((result:any)=>{
          this.cId = result.length
        })
      }
    })


    this.userData.get_careplangoal(this.id).subscribe((result:any)=>{
      this.goal = result
    })
    this.userData.get_careplandiet(this.id).subscribe((result:any)=>{
      this.diet = result
    })
    this.userData.get_careplabexerice(this.id).subscribe((result:any)=>{
      this.exercise = result
    })
    
    this.userData.profile_details().subscribe((result:any)=>{
      this.med = result
    })
    
  }

  
}
function get_tags(tag: any, any: any) {
  throw new Error('Function not implemented.');
}


@Component({
  selector: 'app-exercise-dialog',
  templateUrl: './exercise-dialog.html',
  //styleUrls: ['./health.component.css']
})

@Injectable()
export class ExerciseDialogComponent implements OnInit{

  data_edit: any;
  add_details:any;
  myForm:any;
  tag: any;

  _communication: any;
  fb: any;
  submitted: any;
  careplanlist: any;
  careplan:any;

  carePlan:any;
  category:any;
  care_id: any;
  care_category:any;
  payload: any;
  id: any;
  sequence: any;
  weightUnit: any;


  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ExerciseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,  private route: ActivatedRoute,
    private toast: ToastrService) { 
      this.care_id = data[0]
      this.add_details = data[1]
      //this.care_category = data[2]
    }

    distanceUnit = [
      { value: 'steps', name: 'Steps' },
      { value: 'km', name: 'Km'},
    ];

    repetition = [
      { value: 'none', name: 'None'},
      { value: 'one', name: 'One'},
      { value: 'twice', name: 'Twice / Couple of Times'},
      { value: 'thrice', name: 'Thrice / Three Times'},
      { value: 'four', name: 'Four'},
      { value: 'five', name: 'Five'},
    ];


ngOnInit(): void {

      this.userData.get_document_page(this.tag).subscribe((result: any) => {
        console.log('result', this.tag);
      }); 

      this.userData.get_category("EXERCISE").subscribe((result: any) => {

        //setting id!!
        this.category=result[0].id;
        this.sequence=result[0].id;
        this.weightUnit=result[0].id;
      }); 

      
      this.myForm = this.formBuilder.group({
        carePlan:[''],
        category:[''],
        title:[''],
        distance:[''],
        distanceUnit:[""],
        weight:[''],
        weightUnit:[''],
        numberOfStep:[''],
        repetition:[0],
        sequence:[0],
        //id:[0]
      });

    }
    
    //add Exercise func/.
    addExercise( title: any, distance: any, distanceUnit: any, weight: any, numberOfStep: any, repitition: any){
    
        //this.submitted=true;
        let payload = {"carePlan":this.care_id, "category":this.category, "title": title, 
        "distance": distance, "distanceUnit": distanceUnit, 
        "weight": weight, "weightUnit":this.weightUnit, 
        "numberOfStep": numberOfStep, "repitition": repitition, "sequence": this.sequence
     }
       
        this.userData.add_careplan_exercise(payload).subscribe((result:any)=>{
          
          if(result.error==false){
            this.userData.get_careplabexerice(this.care_id).subscribe((result:any)=>{
                 this.careplanlist= result.data;
                 console.log('result', this.careplanlist);
                 this.closeDialog()
                 
                })
               
              
                this.userData.get_category("EXERCISE").subscribe((result:any)=>{
                  this.careplanlist= result.data;
                  console.log('result', this.careplanlist);
                  this.closeDialog()
                  
                }) 

                
          }
          this.toast.success("Exercise Added Successfully")
          console.log('result', this.payload);
          this.closeDialog();
          this.router.navigate(['/careplan'])

        }) 
      }
  

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
  
  closeDialog(){
      this.dialogRef.close()
   }
}


@Component({
  selector: 'app-exercise-edit',
  templateUrl: './exercise-edit.html',
  //styleUrls: ['./health.component.css']
})

@Injectable()
export class ExerciseEditComponent implements OnInit{

  data_edit: any;
  add_details:any;
  myForm:any;
  tag: any;
  weightUnit:any;
  _communication: any;
  fb: any;
  submitted: any;
  careplanlist: any;
  careplan:any;

  carePlan:any;
  category:any;
  care_id: any;
  care_category:any;
  sequence:any;
  payload: any;
  id: any;
  title:any;
  distance: any;
  //distanceUnit:any;
   weight:any;
   numberOfStep:any;
   //repetition:any;


  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ExerciseEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,  private route: ActivatedRoute,
    private toast: ToastrService) { 
      this.care_id = data[0]
      this.add_details = data[1]
      //this.care_category = data[2]
    }

    distanceUnit = [
      { value: 'steps', name: 'Steps' },
      { value: 'km', name: 'Km'},
    ];

    repetition = [
      { value: 'none', name: 'None'},
      { value: 'one', name: 'One'},
      { value: 'twice', name: 'Twice / Couple of Times'},
      { value: 'thrice', name: 'Thrice / Three Times'},
      { value: 'four', name: 'Four'},
      { value: 'five', name: 'Five'},
    ];


ngOnInit(): void {

      this.userData.get_document_page(this.tag).subscribe((result: any) => {
        console.log('result', this.tag);
      }); 

      this.userData.get_category("EXERCISE").subscribe((result: any) => {

        this.category=result[0].id;
        this.sequence=result[0].id;
        this.weightUnit=result[0].id;
      }); 

      
      this.myForm = this.formBuilder.group({
        carePlan:[''],
        category:[''],
        title:[''],
        distance:[''],
        distanceUnit:[""],
        weight:[''],
        weightUnit:[''],
        numberOfStep:[''],
        repetition:[0],
        sequence:[0],
      });
    }

    editExercise( title: any, distance: any, distanceUnit: any, weight: any, numberOfStep: any, repitition: any){
    
      //this.submitted=true;
      let payload = {"carePlan":this.id, "category":this.category, "title": title, 
      "distance": distance, "distanceUnit": distanceUnit, 
      "weight": weight, "weightUnit":this.weightUnit, 
      "numberOfStep": numberOfStep, "repitition": repitition, "sequence": this.sequence
   }
      this.userData.update_careplan_exercise(payload,this.care_id).subscribe((res:any)=>{
        //this.careplanlist= res.data;
        //console.log('result', this.careplanlist);
       
        this.toast.success("Exercise Updated Successfully")
        this.closeDialog()
        this.router.navigate(['/careplan'])

        this.userData.get_careplabexerice(this.care_id).subscribe((res:any)=>{
          this._communication.emitChange(res)
          this.closeDialog()
          
        })
      })

    }
  

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
  
  closeDialog(){
      this.dialogRef.close()
   }
}


@Component({
  selector: 'app-exercise-delete',
  templateUrl: './exercise-delete.html',
  //styleUrls: ['./health.component.css']
})

@Injectable()
export class ExerciseDeleteComponent implements OnInit{

  data_edit: any;
  add_details:any;
  myForm:any;
  tag: any;
  weightUnit:any;
  _communication: any;
  fb: any;
  submitted: any;
  careplanlist: any;
  careplan:any;

  carePlan:any;
  category:any;
  care_id: any;
  care_category:any;
  sequence:any;
  payload: any;
  id: any;
  title:any;
  distance: any;
  //distanceUnit:any;
   weight:any;
   numberOfStep:any;
   //repetition:any;


  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ExerciseDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,  private route: ActivatedRoute,
    private toast: ToastrService) { 
      this.care_id = data[0]
      this.add_details = data[1]
    }

ngOnInit(): void {

      this.userData.get_document_page(this.tag).subscribe((result: any) => {
        console.log('result', this.tag);
      }); 

      this.userData.get_category("EXERCISE").subscribe((result: any) => {

        this.category=result[0].id;
        this.sequence=result[0].id;
        this.weightUnit=result[0].id;
      }); 

      
      this.myForm = this.formBuilder.group({
        carePlan:[''],
        category:[''],
        title:[''],
        distance:[''],
        distanceUnit:[""],
        weight:[''],
        weightUnit:[''],
        numberOfStep:[''],
        repetition:[0],
        sequence:[0],
      });
    }

    deleteExercise(care_id:any){
    
          this.userData.delete_careplan_exercise(this.care_id).subscribe((res:any)=>{
            this.toast.success("Exercise Deleted Sucessfully!!")
            this.closeDialog()
            this.router.navigate(['/careplan'])
            
            this.userData.get_careplabexerice(this.care_id).subscribe((res:any)=>{
              this._communication.emitChange(res)
              this.closeDialog()
              
            })
            
          })
  
    }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
  
  closeDialog(){
      this.dialogRef.close()
   }
}


//------------------------------------------------------------------------------------------------------------
@Component({
  selector: 'app-healthinfo',
  templateUrl: './healthinfo.html',
  //styleUrls: ['./health.component.css']
})

@Injectable()
export class HealthinfoComponent implements OnInit {

  add_details:any;
  myForm:any;
  ethnicity_list: any;
  bloodgrp_list: any;
  profile: any;
  get_dob: any;
  profile_details: any;
  countries: any;
  tag:any;
  id: any;

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router, private route: ActivatedRoute,
    private toast: ToastrService) { 

    }

  Gender = [
    { value: 'female', name: 'Female' },
    { value: 'male', name: 'Male'},
    { value: 'others', name: 'Others'},
  ];

  Ethnicity= [
    { value: 'american indian', name: 'American Indian' },
    { value: 'asian', name: 'Asian' },
    { value: 'hispanic or latino', name: 'Hispanic or Latino' },
    { value: 'native hawaiian or other pacific islander', name: 'Native Hawaiian or Other Pacific Islander' },
    { value: 'white', name: 'White' },
  ];

  bloodGroup = [
    { value: 'a +ve', name: 'A +ve' },
    { value: 'a -ve', name: 'A -ve' },
    { value: 'b +ve', name: 'B +ve' },
    { value: 'b -ve', name: 'B -ve' },
    { value: 'ab +ve', name: 'AB +ve' },
    { value: 'ab -ve', name: 'AB -ve' },
    { value: 'o +ve', name: 'O +ve' },
    { value: 'o -ve', name: 'O -ve' },

  ];

  ngOnInit(): void      { 
/*
    this.userData.get_document_page(this.tag).subscribe((res:any)=>{
      if(res.error==false){
        this.countries = res.data
      }
    })

    this.userData.get_ethnicity().subscribe((res:any) =>{
      this.ethnicity_list = res;
      //console.log(this.ethnicity_list)
    })

    this.userData.get_bloodgrps().subscribe((res:any) =>{
      this.bloodgrp_list = res;
      //console.log(this.bloodgrp_list)
    })

    this.userData.get_profile_sign().subscribe((res:any)=>{
      this.profile = res[0]
      //console.log(this.profile)
     // this.myForm_health.get('dob')?.setValue(this.profile.dob)
      this.get_dob = this.profile?.dob
    })
    
    this.userData.profile_details().subscribe((res:any)=>{
      if(res.error==false){
        this.add_details = res.data
        console.log(res.data.citizen)
        //this.loadCitizenshipOrder(res?.data.citizen)
      }
    })
*/
  }
}



@Component({
  selector: 'app-profileinfo',
  templateUrl: './profileinfo.html',
  styleUrls: ['./health.component.css']
})

export class ProfileinfoComponent{

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router, private route: ActivatedRoute,
    private toast: ToastrService) { 

    }


  ngOnInit(): void {
    


}
}