import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';


@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})

@Injectable()
export class ConnectionsComponent implements OnInit {
  connection: any;
  selected_tag: any;
  tag='Key_contacts';
  isPopupOpened: any;
  name: any;
  cons:any;
  address: any;
  id: any;
  submitted: any;
  data:any;
  firm_name: any;
  firm_address: any;
  myForm: any;
  add_details:any;
  connections: any;
  closeDialog: any;
  relationships: any;
  id_no: any;
  others: any;
  list:any;
  business_name:any;
  searchText: any;
  isClassExpand: any;
  relationship_list_data: any;
  lastName: any;
  firstName: any;
  description: any;
  consumerId: any;

  constructor( public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService) { }
  

//Open dialog for creating Entity 
    openDialog() {
      this.isPopupOpened = true;     //dialog 
      const dialogRef = this.dialog.open(AddDialogComponent,  {
        width: '550px',
       // data: [this.firm_name, this.firm_address],
      disableClose: true
      });
    }
//Dialog for Family & Friends Entity
    openDialogFF() {
      this.isPopupOpened = true;     //dialog 
      const dialogRef = this.dialog.open(AddRequestComponent,  {
        width: '580px',
        height: '500px',
        //data: [id],
        disableClose: true
      });
    }
  
//Edit Entity Connections
editItem(id: any) {
      this.isPopupOpened = true;     //dialog 
      const dialogRef = this.dialog.open(EditEntityComponent,  {
        width: '550px',
       data: [id],
        disableClose: true
      });
      }
  

//Delete Entity Connections
deleteEntity(id: any){
  
  this.isPopupOpened = true;     //dialog 
  const dialogRef = this.dialog.open(DeleteEntityComponent,  {
    width: '350px',
    data: [id],
    disableClose: true
  });
  console.log(id)

  /*
    this.submitted=true;
    this.userData.delete_entity(id).subscribe((result:any)=>{
      if(result.error==false){

        this.toast.success("Connection Deleted Successfully")
            this.connections= result.relationships;
            console.log('result', this.connection);

        this.userData.get_connection().subscribe((result:any)=>{
          if(result.error==false){
            this.connections = result.relationships;
            console.log('result', this.connection);
            this.closeDialog()
          }
        })  
      } else {
        this.toast.error("Connection Deleted Failed")
        console.log('result', this.relationships);
      }
    })
    */
    
  }

  ngOnInit(): void {

    //relationship api
    this.userData.get_home(this.tag).subscribe((result: any) => {
      this.connection = result.relationships;
      console.log('result', this.connection);
    });

    //dummyrelationship api
    this.userData.get_connection().subscribe((result: any) => {
      this.connection = result.relationships;
      console.log('result', this.connection);
    });

    //selected tags api - keycontacts..
   this.userData.get_relationship_bytag(this.tag).subscribe((result: any) => {
   // this.connection = result.relationships;
    this.connection=result.data.relationships
    console.log('result', this.connection);
    });

    //entity
    this.userData.relationship_list().subscribe((result: any) => {
      this.connection = result.data.relationships;
      console.log('result', this.connection);
    });
    
    //dummyRelationship api
    this.userData.get_connection().subscribe((result: any) => {
      this.connection = result.relationships;
      console.log('result', this.connection);
    });
  
  }

    //  get_tags(tag: any){    
    //   {    
    //     this.userData.get_relationship_bytag(tag).subscribe((result: any) => {
    //       console.log(tag)
    //       this.tag=tag;
    //       //this.connection = result.relationships;
    //     });
     
    // }

//Tags api call - keycontact / !keycontacts
    get_tags(tag: any){       
      console.log(tag)
      this.tag=tag
      if(tag=="Key_contacts")  //KeyContacts
      { 
        this.userData.get_connection().subscribe((result: any) => {
          console.log(tag)
          this.tag=tag;
          this.connection=result.relationships;
          console.log('result', this.relationships); 

        });
       }
      else{   //Personal 
        this.userData.get_relationship_bytag(tag).subscribe((result: any) => {
          console.log(tag)
          this.tag=tag;
          this.connection=result.data.relationships;
          console.log('result', this.relationships); 
        });
      }
    }

//Lauditor Accept button if-accepted/else-pending
    acceptRequest(id: any, biztype: string){
      if (biztype == "consumer") {
        this.userData.care_team_accept_request(id).subscribe((result: any) => {

          if (result.error && typeof (result.msg) == "string") {
            this.toast.info(result.msg);
          }
          else if (!result.error) {
            this.toast.success(result.msg);
            this.userData.get_relationship_bytag(this.tag).subscribe((result: any) => {
              if (result.error == false) {
                this.connection = result.data.relationships;
              }
            })
          }
          else if (result.msg.description) {
            this.toast.info(result.msg.description);
          }
        })

      }

      else if (biztype == "prof") {
        this.userData.service_provider_accept(id).subscribe((result: any) => {

          if (result.error && typeof (result.msg) == "string") {
            this.connection = result.data.relationships;
            this.toast.info(result.msg);
          } 
          else if (!result.error) {
            this.toast.success(result.msg);
            this.userData.get_relationship_bytag(this.tag).subscribe((result: any) => {
              if (result.error == false) {
                this.connection = result.data.relationships;
              }
            })
          }
          else if (result.msg.description) {
            this.toast.info(result.msg.description);
          }
        })

      }
    }

    //Add entity Dialog box open!!!
    open_bottom_dialog($event: any){
      $event.stopPropagation();
      this.isClassExpand = !this.isClassExpand;
    }

    viewDoc(){
      window.location.reload()
    }
}

//Add Entity - Key contacts..
@Component({
  selector: 'app-adddialog',
  templateUrl: './adddialog.html',
  //styleUrls: ['./connections.component.css']
})

export class AddDialogComponent {
  submitted: any;
  connections: any;
  myForm: any;
  add_details:any;
  formBuilder: any;
  address:any;
  name: any;
  id: any;
  id_no: any;
  others: any;
  private _communicationService: any;
  tag:any;
  cons: any;
  connection: any;
  firm_name:any;
  firm_address: any;
  account_id:any;
  biz_identification_no:any;
  relationships: any;
  
  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userData: UsersDataService,
    public toast: ToastrService,
    private router:Router,
    private fb: FormBuilder,
  ) {
    //this.firm_name = data[0];
    //this.firm_address = data[1];
    //this.id = data[2];
  }


ngOnInit() {
  this.myForm = this.fb.group({
    "name": new FormControl(),
    "address": new FormControl(),
    "id":new FormControl(),
    "id_no":new FormControl(),
    "others":new FormControl()
  });
}

//add Entity Connections
addEntity(name: any, address: any, id: any, id_no: any, others: any){

    this.submitted=true;
    let payload = {"firm_name": name, "firm_address": address, "account_id": id, "biz_identification_no": id_no, "others": others}
    this.userData.add_entity(payload).subscribe((result:any)=>{
      if(result.error==false){

        this.toast.success("Connection added Successful")
            this.connection= result.relationships;
            console.log('result', this.connection);

        this.userData.get_connection().subscribe((result:any)=>{
          if(result.error==false){
            this.connection = result.relationships;
            console.log('result', this.connection);
            this.closeDialog()
            window.location.reload()
          }
        })
      } else {
        this.toast.error("Connection Failed")
        console.log('result', this.relationships);
      }
    })
    
  }


  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data)
  }
  
  closeDialog(){
      this.dialogRef.close()
   }
}



//Add Entity - Family & Friends..
@Component({
  selector: 'app-addrequest',
  templateUrl: './addrequest.html',
  styleUrls: ['./connections.component.css']
})
export class AddRequestComponent {
  submitted: any;
  connections: any;
  myForm: any;
  add_details:any;
  //formBuilder: any;
  address:any;
  name: any;
  id: any;
  id_no: any;
  others: any;
  private _communicationService: any;
  tag:any;
  cons: any;
  connection: any;
  firm_name:any;
  firm_address: any;
  account_id:any;
  biz_identification_no:any;
  relationships: any;
  searchText:any;
  description: any;
  consumerId: any;
  consumers:any;
  firstName: any;
  lastName: any;
  isPopupOpened: any;
  result: any;
  //dialogRef: any;
  //data:any;
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService
  ) {
      //this.description = data[0];
      //this.consumerId = data[0];
  }

  openDialogRR(id:any){
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(RequestDialogComponent,  {
      width: '310px',
      height: '250px',
      data: [id],
      disableClose: true
    });
   // console.log(this.data.relationships.id);
    console.log(this.id);
  }

ngOnInit() {

      //consumer - familyfriend_list api
      this.userData.care_team_list_all().subscribe((result: any) => {
        this.connection = result.consumers;
        console.log('result', this.connection);
      });

     

}

//SendRequest Connections -Family&Friends..
/*
sendRequest(description: any,consumerId: any){
    this.userData.care_team_send_request(consumerId, description).subscribe((result: any) => {
      if (result.error==false) {
        this.toast.info(result.msg);
        this.connection = result.relationships;
        //this.connection = result.description;
        //this.connection = result.consumerId;
        console.log('result',this.connection)
      }
      else if(!result.error) {
        this.toast.success(result.msg);
        this.userData.get_relationship_bytag(this.tag).subscribe((result: any) => {
          if (result.error == false) {
            this.connection = result.relationship;
            //this.connection = result.description;
            //this.connection = result.consumerId;
            console.log('result',this.connection)
          }
        })
      }
      else if(result.msg.description) {
        this.toast.info(result.msg.description);
      }
    })
}
*/

onNoClick(): void {
  this.dialogRef.close();
  console.log(this.data)
}

closeDialog(){
  this.dialogRef.close()
}

}



//Edit Entity..
@Component({
  selector: 'app-editentity',
  templateUrl: './editentity.html',
  //styleUrls: ['./connections.component.css']
})

export class EditEntityComponent {
  submitted: any;
  connections: any;
  myForm: any;
  add_details:any;
  formBuilder: any;
  address:any;
  name: any;
  id: any;
  id_no: any;
  others: any;
  private _communicationService: any;
  tag:any;
  cons: any;
  connection: any;
  firm_name:any;
  firm_address: any;
  account_id:any;
  biz_identification_no:any;
  relationships: any;
  

  constructor(
    public dialogRef: MatDialogRef<EditEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userData: UsersDataService,
    public toast: ToastrService,
    private router:Router,
    private fb: FormBuilder,
  ) {
    //this.firm_name = data[0];
    //this.firm_address = data[1];
    this.id = data[0];
  }


ngOnInit() {
  this.myForm = this.fb.group({
    "name": new FormControl(),
    "address": new FormControl(),
    "id":new FormControl(),
    "id_no":new FormControl(),
    "others":new FormControl()
  });
}


/*
submitData(id:any){

    this.submitted=true;
    //let payload = {"firm_name": name, "firm_address": address, "account_id": id, "biz_identification_no": id_no, "others": others}
    this.userData.edit_entity(id,this.data).subscribe((result:any)=>{
      if(result.error==false){

        this.toast.success("Connection Updated Successfully")
            this.connections= result.relationships;
            console.log('result', this.connection);

        this.userData.get_connection().subscribe((result:any)=>{
          if(result.error==false){
            this.connections = result.relationships;
            console.log('result', this.connection);
            this.closeDialog()
          }
        })  
      } else {
        this.toast.error("Connection Updated Failed")
        console.log('result', this.relationships);
      }
    })
    
  }
  */

 //edit Entity Connections

edit_entity(name: any,address: any,id: any,id_no: any,others: any){
  this.submitted=true;
  let payload = {"firm_name": name, "firm_address": address, "account_id": id, "biz_identification_no": id_no, "others": others}
  this.userData.edit_entity(this.id,payload).subscribe((result:any)=>{
    if(result.error==false){

      this.toast.success("Connection Updated Successfully")
          this.connections= result.relationships;
          window.location.reload()

      this.userData.get_connection().subscribe((result:any)=>{
        if(result.error==false){
          this.connections = result.relationships;
          console.log('result', this.connections);
          this.closeDialog()
        }
      })  
    } 
    else {
      this.toast.error("Connection Updated Failed")
      console.log('result', this.relationships);
    }
  })
}

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data)
  }
  
  closeDialog(){
      this.dialogRef.close()
   }
}


//Delete Entity..
@Component({
  selector: 'app-deleteentity',
  templateUrl: './deleteentity.html',
  //styleUrls: ['./connections.component.css']
})

export class DeleteEntityComponent {
  submitted: any;
  connections: any;
  myForm: any;
  add_details:any;
  formBuilder: any;
  address:any;
  name: any;
  id: any;
  id_no: any;
  others: any;
  private _communicationService: any;
  tag:any;
  cons: any;
  connection: any;
  firm_name:any;
  firm_address: any;
  account_id:any;
  biz_identification_no:any;
  relationships: any;
  isPopupOpened: any;
  dialog: any;
  
  
  constructor(
    public dialogRef: MatDialogRef<DeleteEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userData: UsersDataService,
    public toast: ToastrService,
    private router:Router,
    private fb: FormBuilder,
  ) {
      this.id = data[0];
    }


ngOnInit() {
  this.myForm = this.fb.group({
    "name": new FormControl(),
    "address": new FormControl(),
    "id":new FormControl(),
    "id_no":new FormControl(),
    "others":new FormControl()
  });
}

delete_entity(id:any){
  this.submitted=true;
  this.userData.delete_entity(id).subscribe((result:any)=>{
    if(result.error==false){

      this.toast.success("Connection Deleted Successfully")
          this.connections= result.relationships;
          console.log('result', this.connection);
          window.location.reload()

      this.userData.get_connection().subscribe((result:any)=>{
        if(result.error==false){
          this.connections = result.relationships;
          console.log('result', this.connection);
          this.closeDialog()
          
        }
      })  
    } else {
      this.toast.error("Connection Deleted Failed")
      console.log('result', this.relationships);
    }
  })
}

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data)
  }
  
  closeDialog(){
      this.dialogRef.close()
   }
}

//Request Dialog Box..

//Delete Entity..
@Component({
  selector: 'app-requestdialog',
  templateUrl: './requestdialog.html',
  //styleUrls: ['./connections.component.css']

})

export class RequestDialogComponent {
  submitted: any;
  connections: any;
  myForm: any;
  add_details:any;
  formBuilder: any;
  address:any;
  name: any;
  id: any;
  id_no: any;
  others: any;
  tag:any;
  cons: any;
  connection: any;
  firm_name:any;
  firm_address: any;
  account_id:any;
  biz_identification_no:any;
  relationships: any;
  isPopupOpened: any;
  dialog: any;
  description: any;
  consumerId: any;
  
  constructor(
    public dialogRef: MatDialogRef<RequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userData: UsersDataService,
    public toast: ToastrService,
    private router:Router,
    private fb: FormBuilder,
    private http: HttpClient,
  ) {
      this.id = data[0];
    }

ngOnInit() { }

//SendRequest Connections -Family&Friends..
sendRequest(description: any,id: any){
    this.submitted=true;
    this.userData.care_team_send_request(description, id).subscribe((result: any) => {
      if(result.error==false) {
        this.toast.success(result.msg);
        this.connection = result.consumers;
        //this.connection = result.description;
        //this.connection = result.consumerId;
        console.log('result',this.connection)
        this.closeDialog()
        //window.location.reload()
      }
      else if(!result.error) {
        this.toast.info(result.msg);
        this.userData.get_relationship_bytag(this.tag).subscribe((result: any) => {
          if (result.error == false) {
            //this.connection = result.data.relationships;
            this.connections= result.consumers;
            console.log('result',this.connection)
          }
          this.closeDialog()
        })
      }
      else if(result.msg) {
        this.toast.info(result.msg);
        this.closeDialog()
      }
      this.closeDialog()
    })
}


  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data)
  }
  
  closeDialog(){
      this.dialogRef.close()
   }
}
