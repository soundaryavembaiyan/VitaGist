import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { animate } from '@angular/animations';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css'],
})

@Injectable()
export class DocumentComponent implements OnInit {

  docs: any;
  checkoutForm: any;
  doc_details: any;
  result: any;
  profile_details: any[] = [];
  index_country: any;
  country: any;
  list: any[] = [];
  con: any;
  dataSource: any;
  myDataArray: any;
  id: any;
  usersDataService: any;

  url: any;
  name: any;
  category: any;
  sanitizer: any;
  viewDoc = false
  type_con: any;
  dialogRef: any;
  data: any;
  docid: any;
  tags: any;
  isPopupOpened: any;
  type: any;
  index_category: any;
  doctype: any;
  tag='Identity';

  description: any;
  expiration_date: any;
  searchText:any;

  constructor(public dialog: MatDialog,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private _sanitizer: DomSanitizer,
    private toast: ToastrService) {
     //this.tags=this.data[0];
    // this.docid=this.data[1];
  }

  //Add document for Identity,  -passing index_country, country data here
  openDialog() {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(DialogBoxComponent,  {
      width: '450px',
      data: [this.index_country, this.country, this.url],
      disableClose: true
    });
  }

  //Add document for Others,  -passing index_country, country data here
  openDialogAll() {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '450px',
      data: [this.index_country, this.country, this.url, this.tag, this.expiration_date],
      //disableClose: true
    });
  }

  ngOnInit(): void {
    this.userData.get_document_page(this.tag).subscribe((result: any) => {
      this.docs = result.data
      console.log('result', this.docs);
    });
    this.get_tags(this.tag)
    //Profile
    this.userData.get_profile_sign().subscribe((result: any) => {
      if (result.error == false) {

        this.profile_details = result.data.citizen
        console.log("result")

        this.profile_details.forEach(element => {
          if (element.index == "citizen_primary") {
            this.index_country = element.index
            this.country = element.country
          }
        });
        console.log(this.index_country, this.country)
      }
      else { }
    })
  }

// get_identity(tag: any){
//   console.log(tag)
//     this.tag=tag
//   this.userData.get_document(tag).subscribe((result: any) => {
//     this.docs = result.data
//     console.log('result', this.docs);
//   });
// }

  get_tags(tag: any){       
    console.log(tag)
    this.tag=tag
    if(tag=="Identity")  //Identity doc form
    { 
      this.userData.get_document(tag).subscribe((result: any) => {
        this.docs = result.data
        //console.log('result', this.docs);
      });
     }
    else{   //Personal doc form
      this.userData.get_tag_doc(tag).subscribe((result: any) => {
        this.docs = result.data 
        //console.log('result', this.docs); 
      });
    }
  }

  //Delete action for identity 
  deleteItem(type: any) {
    this.userData.delete_api(type).subscribe((result: any) => {
      if (result.error == false) {
        this.toast.success(result.msg)
        this.userData.get_crediential_docs(this.index_country).subscribe((result: any) => {
          if (result.error == false) {
            this.docs = result.data
             //window.location.reload()
          }
        })
      }
    })
  }
 
 //Delete action for personals
 delete_personal(id:any){
  this.userData.delete_personal_api(id).subscribe((result: any) => {
    if (result.error == false) {
    this.toast.success(result.msg)
    this.userData.get_tag_doc(this.tag).subscribe((result: any) => {
      this.docs = result.data 
      //console.log('result', this.docs); 
    });
    }
  })
}

  //View action 
  viewItem(type: any, url: any) {
    this.result = url;
    this.viewDoc = true;
    //index_country -category, type -name
    console.log(url);
    this.dialog.open(ViewComponent, {
      width: '800px',
      data: [url],
    });
  }

  editItem(tags: any, id: any, doctype: any) {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(EditComponent, {
      width: '300px',
      data: [tags, id, this.index_country, doctype],
      disableClose: true
    });
  }

   editAll(tags: any, id: any){
    console.log(id)
     this.isPopupOpened = true;     //dialog 
     const dialogRef = this.dialog.open(EditAllComponent, {
     width: '400px',
      data: [tags,  id, this.index_country],
      disableClose: true
    });
  }

  // delete_personal(id:any){
  //   console.log(id)
  //   this.userData.delete_personal_api(id).subscribe((result: any) => {
  //     if (result.error == false) {
  //        this.toast.success(result.msg)
  //       this.userData.get_all_del(this.index_country).subscribe((result: any) => {
  //         if (result.error == false) {
  //           this.docs = result.data
  //         }
  //       })
  //     }
  //   })
  // }

  download_credential(doctype: any){
    this.userData.download_credentials(this.index_country,doctype).subscribe((res:any)=>{
      if(res.error==false){
        window.open(res.data.url, '_blank');
      }
    })
  }
  
 download_personal(id: any){
  this.userData.download_personal(id,this.index_country).subscribe((res:any)=>{
    if(res.error==false){
      window.open(res.data.url,'_blank');
    }
  })
}

viewDocs(){
  window.location.reload()
}
}


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.html',
  providers: [DatePipe]
  //styleUrls: ['./document.component.css']
})
export class DialogBoxComponent {

  submitted: any;
  myForm: any;
  save: any;
  dialogForm: any;
  tag='Identity';
  tag_list_id=["Identity"]
  formBuilder: any;
  form: any;
  size:any;
  files:any;
  allowed_exe_status:any;
  category: any;
  country: any;
  action: any;
  url: any;

  //---DialogAll
  title: any;
  dialog: any;
  result: any;
  index_country: any;
  type: any;
  docid: any;
  tags:any;
  details: any;
  index_category: any;
  //doctype: any;
  edit_details: any;
  description: any;
  name: any;
  id: any;
  docs: any;
  expiration_date: any;
 
  toppings = new FormControl('');
  toppingList: string[] = ["Health","Legal","Finance","Personal","Others"];
  selected_tag: any;
  date:any;
  datenew: any;
firststyle: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private userData: UsersDataService,
    private router:Router,
    private toast: ToastrService,
    private datePipe: DatePipe,
    private fb: FormBuilder ) 
    { 
       // extracting the index_country, country data here
       this.category = data[0];
       this.country = data[1];
       // dialogRef.disableClose = true;  ---> Dialog disable outside
      this.url=data[2];
      this.selected_tag=data[3];
      this.expiration_date=data[4];
    }

    persons = [
      {  Identity: 'Identity' },
    ];
  
    doctype = [
      { value: 'aadhar', name: 'AADHAR Card' },
      { value: 'voterid', name: 'Voter ID'},
      { value: 'pancard', name: 'PAN Card' },
      { value: 'passport', name: 'Passport' },
      { value: 'driver_license', name: 'Driver Licence' },
    ];

    
    ngOnInit() {
      this.myForm = new FormGroup({
        "tags": new FormControl(),
        "docid": new FormControl(),
        "doctype": new FormControl(),
        "filename": new FormControl(),
        "name": new FormControl(),
        "description": new FormControl(),
        "expiration_date":new FormControl(),
        "category": new FormControl()
      });
      console.log('tag',this.selected_tag)
    }
      
  getDocumentsIdentity() {
    this.userData.get_document(this.selected_tag).subscribe((result: any) => {
      if (result.error == false) {
        this.docs = result.data;
      }
    })
  }
  getDocumentsAll() {
    this.userData.get_tag_doc(this.selected_tag).subscribe((result: any) => {
      this.docs = result.data 
    })
  }

    //DialogIdentity submit/upload button..
  submitData_Identity(data: any){
    //console.warn('Your Data', this.myForm.value);

    const formData= new FormData();
    formData.append("docid",this.myForm.value.docid)
    formData.append("doctype",this.myForm.value.doctype)
    formData.append("filename",this.files.name)
    formData.append("content_type",this.files.type)
    formData.append("category", this.category)
    formData.append("file", this.files)
    formData.append("country",this.country)
    formData.append("tags",JSON.stringify(this.myForm.value.tags))

    this.userData.add_dialog(formData).subscribe((result: any)=> {
  
    if (result.error==false){
      this.toast.success("File Upload Successful");
      this.dialogRef.close({event:this.action});
      this.router.navigate(['/document'])
      //window.location.reload()
    }
    else{
      this.toast.error("Upload Failed");
      console.log(this.data)
    }
    })
    this.getDocumentsIdentity();
  }
  
  //DialogAll submit/upload button..
  submitData_Personal(data: any){
   // console.warn('Your Data', this.myForm.value);
 
    let date=this.myForm.value.expiration_date
    this.datenew = this.datePipe.transform(date,'dd-MM-YYYY')

    const formData = new FormData();
    formData.append("name", this.myForm.value.name)
    formData.append("description", this.myForm.value.description)
    formData.append("expiration_date",this.datenew)
    formData.append("filename", this.files.name)
    formData.append("content_type", this.files.type)
    formData.append("category", this.category)
    formData.append("file", this.files)
    formData.append("tags", JSON.stringify(this.myForm.value.tags))

    this.userData.add_dialog_personal(formData).subscribe((result: any) => {
      if (result.error == false) {
        this.toast.success("File Upload Successful");
        this.closeDialog();
        //this.router.navigate(['/document'])
        //window.location.reload()
      }
      else {
        this.toast.error("Upload Failed");
        // console.log('data',this.data)
        // console.log('topp',this.toppingList);
      }
    })
    this.getDocumentsAll();
}

//files size target
  onFileChanged(event: any) {   
    this.files = event.target.files[0];
    //console.log(this.files)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
  
  closeDialog(){
      this.dialogRef.close();
      this.getDocumentsAll()
   }
}


@Component({
  selector: 'app-view',
  templateUrl: './view.html',
  styleUrls: ['./document.component.css']
})

export class ViewComponent {

  url: any;
  name: any;
  category: any;
  sanitizer: any;
  title: any;
  dialog: any;
  result: any;
  index_country: any;
  type: any;

  constructor(
    public dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userData: UsersDataService,
    public toast: ToastrService,
    private _sanitizer: DomSanitizer,
  ) {
    this.url = data[0]
  }

  ngOnInit(): void {
    console.log(this.url)
  }

  closeDialog() {
    this.dialogRef.close()
  }

}


@Component({
  selector: 'app-delete',
  templateUrl: './delete.html',
  styleUrls: ['./document.component.css']
})

export class DeleteComponent {

  index_country: any;
  docs: any;
  type: any;
  country: any;
  doctype: any;
  dialog: any;
  submitted: any;
  tag: any;
  name: any;

  constructor(public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService,
    private fb: FormBuilder) {
      
    this.index_country = data[0];
    this.doctype = data[1];
    this.name =data[2];
  }

  ngOnInit() { }

  deleteRow() {
    //index_country - category
    // console.log(this.type)
    if (this.tag == 'Identity') {
    this.submitted = true
    this.userData.delete_api(this.doctype).subscribe((result: any) => {
      if (result.error == false) {
        this.toast.success(result.msg)
        this.userData.get_crediential_docs(this.index_country).subscribe((result: any) => {
          if (result.error == false) {
            this.docs = result.data
          }
        })
      }
    })
  } 
}

delete_personal(id:any){
  this.userData.delete_personal_api(id).subscribe((result: any) => {
    if (result.error == false) {
       this.toast.success(result.msg)
      this.userData.get_all_del(this.index_country).subscribe((result: any) => {
        if (result.error == false) {
          this.docs = result.data
          this.router.navigate(['/document'])
        }
      })
    }
  })
}

closeDialog() {
  this.dialogRef.close()
}
}


//Edit component 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.html',
  //styleUrls: ['./document.component.css']
})

export class EditComponent {

  category: any;
  title: any;
  dialog: any;
  result: any;
  index_country: any;
  type: any;
  myForm: any;
  docid: any;
  tags:any[]=[];
  action: any;
  details: any;
  submitted: any;
  index_category: any;
  doctype: any;
  edit_details: any;

  toppings = new FormControl('');
  toppingList: string[] = ["Identity"];

 
  constructor(
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService,
    private fb: FormBuilder) {

    this.toppings = data[0];
    this.docid = data[1];
    this.category = data[2];
    this.doctype = data[3];
  }
  
  // tagList: string[] = ['Identity']

  ngOnInit() {
    this.myForm = new FormGroup({
      "tags": new FormControl(),
      "docid": new FormControl()
    });
  }

  submitData(data: any) {

    this.submitted = true
    console.log(this.tags);
    console.log(this.docid);
    console.log(this.index_country);
    console.log(this.doctype);

    //let edit_data = { "tags": [this.tags], "docid": this.docid }
    this.userData.edit_docs(this.category, this.doctype, data).subscribe((result: any) => {
      /*
      this.myForm = new FormGroup({
        tags: new FormControl(result['tags']),
        docid: new FormControl(result['docid'])
      });  */
      
      console.log(this.data);

      if (result.error == false) {
        this.toast.success("Details Updated Successful");
        console.log(this.data);
        this.dialogRef.close();
        //window.location.reload()
      }
      else {
        this.toast.error("Updated Failed");
        //console.log(this.data);
      }
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }
}


//EditAll component 
@Component({
  selector: 'app-editall',
  templateUrl: './editall.html',
  providers: [DatePipe]
  //styleUrls: ['./document.component.css']
})

export class EditAllComponent {

  category: any;
  title: any;
  dialog: any;
  result: any;
  index_country: any;
  type: any;
  myForm: any;
  docid: any;
  tags:any;
  action: any;
  details: any;
  submitted: any;
  index_category: any;
  doctype: any;
  edit_details: any;
  description: any;
  name: any;
  id: any;
  docs: any;
  expiration_date: any;
 
  toppings = new FormControl('');
  toppingList: string[] = ["Health","Legal","Finance","Personal","Others"];
  datenew: any;
  date:any;

  constructor(
    public dialogRef: MatDialogRef<EditAllComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService,
    private datePipe: DatePipe,
    private fb: FormBuilder) {

    this.toppings = data[0];
    this.id = data[1];
    this.category = data[2];
  }

  ngOnInit() {
    this.myForm = new FormGroup({
     "tags": new FormControl(),
     "name": new FormControl(),
     "description": new FormControl(),
     "expiration_date":new FormControl()
    });
  }
 
 
  submitData(data: any) {

   this.submitted = true;

    //let edit_data = { "tags": [this.tags], "name": this.name, "description": this.description, "expiration_date": this.datenew}
    this.userData.edit_personal(this.id, data).subscribe((result: any) => {
    
     if (result.error == false) {
       this.toast.success("Details Updated Successful");
       console.log(this.data);
       this.dialogRef.close();
       window.location.reload()
     }
     else {
        this.toast.error("Updated Failed");
        console.log(this.data);
        this.dialogRef.close();
     }
   })
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
