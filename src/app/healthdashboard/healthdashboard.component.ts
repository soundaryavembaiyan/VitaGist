import { Component, Inject, Injectable, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClient, HttpClientJsonpModule, JsonpClientBackend } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsersDataService } from '../users-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HealthComponent } from '../health/health.component';
import { A11yModule } from '@angular/cdk/a11y';
import { DatePipe } from '@angular/common';
import { isObservable } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-healthdashboard',
  templateUrl: './healthdashboard.component.html',
  styleUrls: ['./healthdashboard.component.css'],
  providers: [DatePipe]
})
export class HealthdashboardComponent implements OnInit {

  add_details: any;
  myForm: any;
  ethnicity_list: any;
  bloodgrp_list: any;
  profile: any;
  get_dob: any;
  profile_details: any;
  countries: any;
  tag: any;
  citizen: any;
  profile_page: any;
  health_profile: any;
  isPopupOpened: any;
  profile_detail: any;

  medcon: any;
  profile_id: any;
  payload: any;
  p_id: any;
  @Input() id: any;
  visited_dialog: any;
  title: any;
  initial_res: any;
  med_condition: any;
  datenew: any;
  updated_profile: any;
  submitted: any;
  conf: any;
  dialogRef: any;
  index_selected: any;
  dialog_status: any;
  i: any;

  constructor(public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    //public data: any,
    private userData: UsersDataService,
    private datePipe: DatePipe,
    private router: Router,
    private toast: ToastrService) {
    //this.profile_id = this.data[0]
  }

  medicalDialog() {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(MedicalDialogComponent, {
      width: '450px',
      data: [this.title, this.profile_details], //profile_details - in Health profile data detail using profile_details...  //title - db card status
    }).afterClosed().subscribe(result => {
      //disableClose: true
      //dialog.disableClose = true
      this.updated_profile = Object.assign({}, result);
      //console.log(result)
    });
  }

  medicalEditDialog(i: any) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(MedicalEditComponent, {
      width: '450px',
      data: [this.title, this.profile_details, i], //profile_details - in Health profile data detail using profile_details...  //title - db card status
    }).afterClosed().subscribe(result => {
      this.updated_profile = Object.assign({}, result);

    });
    console.log(this.i)
    console.log(this.profile_details)
  }

  allergyDialog() {

    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(AllergyDialogComponent, {
      width: '450px',
      data: [this.title, this.profile_details],
    }).afterClosed().subscribe(result => {

      this.updated_profile = Object.assign({}, result);
      //console.log(result)
    });
  }

  allergyEditDialog(i: any) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(AllergyEditComponent, {
      width: '450px',
      data: [this.title, this.profile_details, i], //profile_details - in Health profile data detail using profile_details...  //title - db card status
    }).afterClosed().subscribe(result => {
      this.updated_profile = Object.assign({}, result);

    });
    console.log(this.i)
    console.log(this.profile_details)
  }

  medicationDialog() {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(MedicationsDialogComponent, {
      width: '450px',
      height: '450px',
      data: [this.title, this.profile_details],
    }).afterClosed().subscribe(result => {

      this.updated_profile = Object.assign({}, result);
      //console.log(result)
    });
  }

  medicationEditDialog(i: any) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(MedicationsEditComponent, {
      width: '450px',
      height:'450px',
      data: [this.title, this.profile_details, i], //profile_details - in Health profile data detail using profile_details...  //title - db card status
    }).afterClosed().subscribe(result => {
      this.updated_profile = Object.assign({}, result);

    });
    console.log(this.i)
    console.log(this.profile_details)
  }

  familyDialog() {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(FamilyDialogComponent, {
      width: '450px',
      data: [this.title, this.profile_details],
    }).afterClosed().subscribe(result => {

      this.updated_profile = Object.assign({}, result);
      //console.log(result)
    });
  }

  familyEditDialog(i: any) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(FamilyEditComponent, {
      width: '450px',
      data: [this.title, this.profile_details, i], //profile_details - in Health profile data detail using profile_details...  //title - db card status
    }).afterClosed().subscribe(result => {
      this.updated_profile = Object.assign({}, result);

    });
    console.log(this.i)
    console.log(this.profile_details)
  }

  insuranceDialog() {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(InsuranceDialogComponent, {
      width: '450px',
      height: '450px',
      data: [this.title, this.profile_details],
    }).afterClosed().subscribe(result => {

      this.updated_profile = Object.assign({}, result);
      //console.log(result)
    });
  }

  insuranceEditDialog(i: any) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(InsuranceEditComponent, {
      width: '450px',
      height: '450px',
      data: [this.title, this.profile_details, i], //profile_details - in Health profile data detail using profile_details...  //title - db card status
    }).afterClosed().subscribe(result => {
      this.updated_profile = Object.assign({}, result);

    });
    console.log(this.i)
    console.log(this.profile_details)
  }

  immunizationDialog() {
    this.isPopupOpened = true;     //dialog 
    const dialogRef = this.dialog.open(ImmunizationDialogComponent, {
      width: '450px',
      data: [this.title, this.profile_details],
    }).afterClosed().subscribe(result => {

      this.updated_profile = Object.assign({}, result);
      //console.log(result)
    });
  }

  immunizationEditDialog(i: any) {
    this.isPopupOpened = true;
    const dialogRef = this.dialog.open(ImmunizationEditComponent, {
      width: '450px',
      data: [this.title, this.profile_details, i], //profile_details - in Health profile data detail using profile_details...  //title - db card status
    }).afterClosed().subscribe(result => {
      this.updated_profile = Object.assign({}, result);

    });
    console.log(this.i)
    console.log(this.profile_details)
  }

  Gender = [
    { value: '', name: 'Select Gender' },
    { value: 'female', name: 'Female' },
    { value: 'male', name: 'Male' },
    { value: 'others', name: 'Others' },
  ];

  Ethnicity = [
    { value: '', name: 'Select Ethnicity' },
    { value: 'american indian', name: 'American Indian' },
    { value: 'asian', name: 'Asian' },
    { value: 'hispanic or latino', name: 'Hispanic or Latino' },
    { value: 'native hawaiian or other pacific islander', name: 'Native Hawaiian or Other Pacific Islander' },
    { value: 'white', name: 'White' },
  ];

  Blood = [
    { value: '', name: 'Select Blood Group' },
    { value: 'a +ve', name: 'A +ve' },
    { value: 'a -ve', name: 'A -ve' },
    { value: 'b +ve', name: 'B +ve' },
    { value: 'b -ve', name: 'B -ve' },
    { value: 'ab +ve', name: 'AB +ve' },
    { value: 'ab -ve', name: 'AB -ve' },
    { value: 'o +ve', name: 'O +ve' },
    { value: 'o -ve', name: 'O -ve' },

  ];

  ngOnInit(): void {

    //profile page
    this.userData.get_profile_sign().subscribe((res: any) => {
      this.profile_page = res.data;
      console.log(this.profile_page)
    })

    //Health profile info..
    this.myForm = this.formBuilder.group({
      gender: [''],
      ethnicity: [''],
      height: [""],
      weight: [''],
      bloodGroup: [''],
      dob: ['', this.datenew],
    });


    //let date=this.myForm.value.dob
    //this.datenew = this.datePipe.transform(date,'dd-MM-YYYY')

    this.userData.profile_details().subscribe((result: any) => {
      //setting id..
      this.profile_id = result[0].id;
      this.profile_details = result[0]
      console.log("result", this.profile_details)
      console.log("result", this.profile_id)

      if(this.profile_detail){
        this.profile_id = this.profile_detail.id;
        //this.med_condition = this.profile_detail["medicalCondition"][0]
      

      } else {
        this.profile_detail = {}
        this.profile_detail.medicalCondition = [];
        this.profile_detail.allergy = [];
        this.profile_detail.medication = [];
        this.profile_detail.familyHistory = [];
        this.profile_detail.insurance = [];
        this.profile_detail.immunization = [];
        this.profile_detail.addon =[];
      }

    })



    //citizenships..
    this.userData.get_document_page(this.tag).subscribe((result: any) => {
      if (result.error == false) {
        this.citizen = result
        console.log(this.citizen)
      }
    })

    this.userData.get_ethnicity().subscribe((result: any) => {
      this.ethnicity_list = result
      console.log(this.ethnicity_list)
    })

    this.userData.get_bloodgrps().subscribe((result: any) => {
      this.bloodgrp_list = result
      console.log(this.bloodgrp_list)
    })

    /* get_date_value(date){
       return moment(date,"MM-DD-YYYY").format();
     }*/
  }

  //HEALTH profile SAVE!! 
  saveMe(profile_id: any) {
   console.log(this.updated_profile)
   
   /*
   this.updated_profile.gender=this.myForm.value.gender
   this.updated_profile.ethnicity=this.myForm.value.ethnicity
   this.updated_profile.height=this.myForm.value.height
   this.updated_profile.weight=this.myForm.value.weight
   this.updated_profile.bloodGroup=this.myForm.value.bloodGroup
   this.updated_profile.dob=this.myForm.value.dob
   */
   

   this.userData.update_profile_list(this.profile_id, this.updated_profile).subscribe((result: any) => {
      this.toast.success("Profile Updated and Saved successfully")
      this.router.navigate(['/health'])
    })

    //Healt profile API..
    this.userData.profile_details().subscribe((result: any) => {
      this.profile_id = result[0].id;    //setting id..
      this.profile_details = result[0]
      console.log("result", this.profile_details)
      console.log("result", this.profile_id)
    })
    console.log(this.updated_profile,this.myForm.value)
  }
  //----saveMe() function ends here----


  /*
  medicalEditDialog(conditionName: any , yearOfDiagnosis: any , comment: any){
    const dialogRef = this.dialog.open(MedicalDialogComponent, {
      width: '450px',
      data: [this.title, this.profile_details], //profile_details - in Health profile data detail using profile_details...  //title - db card status
    }).afterClosed().subscribe(result => {
      //this.updated_profile = Object.assign({}, result);
      console.log(result)
    });
    this.profile_details.medicalCondition[this.index_selected].conditionName = conditionName;
    this.profile_details.medicalCondition[this.index_selected].yearOfDiagnosis = Number(yearOfDiagnosis);
    this.profile_details.medicalCondition[this.index_selected].comment = comment;
    this.dialogRef.close(this.profile_details);
    console.log(this.profile_details)
  }
  */


  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}

@Component({
  selector: 'app-medicaldialog',
  templateUrl: './medical-dialog.html',
  //styleUrls: ['./healthdashboard.component.css']
})
export class MedicalDialogComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  medCon: any;
  submitted: any;
  save_Click: any;
  profile_detail: any;
  close: any;
  title: any;
  index_selected: any;
  dialog_status = '';


  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<MedicalDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1])
    //this.index_selected = data[2]
    //this.dialog_status = data[3]
  }

  medical = [
    { value: '...', name: 'Select Condition' },
    { value: 'adhd', name: 'ADHD' },
    { value: 'abdominalpain', name: 'Abdominal pain' },
    { value: 'acne', name: 'Acne' },
    { value: 'allergies', name: 'Allergies' },
    { value: 'anemia', name: 'Anemia' },
    { value: 'antidepressants', name: 'Antidepressants' },
    { value: 'anxiety', name: 'Anxiety' },
    { value: 'appendicitis', name: 'Appendicitis' },
    { value: 'arthritis', name: 'Arthritis ' },
    { value: 'asthma', name: 'Asthma' },
    { value: 'autism', name: 'Autism' },
    { value: 'avian', name: 'Avian Influenza' },
    { value: 'bacterial', name: 'Bacterial Vaginosis' },
    { value: 'birthdefects', name: 'Birth defects' },
    { value: 'bladder', name: 'Bladder Infection' },
    { value: 'breast', name: 'Breast Abscess' },
    { value: 'bronchitis', name: 'Bronchitis' },
    { value: 'cancer', name: 'Cancer' },
    { value: 'cataracts', name: 'Cataracts' },
    { value: 'celiac', name: 'Celiac Disease' },
    { value: 'chickenpox', name: 'Chicken Pox' },
    { value: 'chlamydia', name: 'Chlamydia' },
    { value: 'cfs', name: 'Chronic Fatigue Syndrome' },
    { value: 'copd', name: 'Chronic Obstructive Pulmonary Disease (COPD)' },
    { value: 'chronic', name: 'Chronic Disease' },
    { value: 'cold', name: 'Cold' },
    { value: 'coldflu', name: 'Cold and Flu' },
    { value: 'colitis', name: 'Colitis' },
    { value: '', name: 'Conjunctivitis' },
    { value: '', name: 'Coronavirus' },
    { value: '', name: 'Crohns Disease' },
    { value: '', name: 'Croup' },
    { value: '', name: 'Dental Infection' },
    { value: '', name: 'Depression' },
    { value: '', name: 'Dermatitis' },
    { value: '', name: 'Diabetes' },
    { value: '', name: 'Ear Infection' },
    { value: '', name: 'Ear, Nose, and Throat' },
    { value: '', name: 'Ebola (Ebola Virus Disease)' },
    { value: '', name: 'Eczema' },
    { value: '', name: 'Endometriosis' },
    { value: '', name: 'Epilepsy' },
    { value: '', name: 'Erectile Dysfunction' },
    { value: '', name: 'Face and Mouth' },
    { value: '', name: 'Fast Facts' },
    { value: '', name: 'Fatigue' },
    { value: '', name: 'Fetal Alcohol Spectrum Disorder' },
    { value: '', name: 'Fibroids' },
    { value: '', name: 'Fibromyalgia' },
    { value: '', name: 'Fifth Disease' },
    { value: '', name: 'Flu (Influenza)' },
    { value: '', name: 'Food Poisoning' },
    { value: '', name: 'Gastritis' },
    { value: '', name: 'General Health' },
    { value: '', name: 'Genital Herpes (Herpes Simplex Virus' },
    { value: '', name: 'Gerd' },
    { value: '', name: 'Giardiasis' },
    { value: '', name: 'Gonorrhea' },
    { value: '', name: 'HIV/AIDS' },
    { value: '', name: 'Hand foot mouth disease' },
    { value: '', name: 'head Lice' },
    { value: '', name: 'Headaches' },
    { value: '', name: 'Health and Wellness' },
    { value: '', name: 'Heart Disease' },
    { value: '', name: 'Heart attack' },
    { value: '', name: 'Hepatitis' },
    { value: '', name: 'Hernia' },
    { value: '', name: 'Herpes' },
    { value: '', name: 'Hives' },
    { value: '', name: 'Human Papillomavirus (HPV)' },
    { value: '', name: 'Hypertension' },
    { value: '', name: 'Irritable Bowel Syndrome' },
    { value: '', name: 'Kidney Disease(Chronic Kidney Disease)' },
    { value: '', name: 'Layngitis' },
    { value: '', name: 'Lupus' },
    { value: '', name: 'Lyme Disease' },
    { value: '', name: 'Measles' },
    { value: '', name: 'Mens Health' },
    { value: '', name: 'Meningitis' },
    { value: '', name: 'Menstruation' },
    { value: '', name: 'Mental Health' },
    { value: '', name: 'Methicillin-resistant Staphylococcus aureus (MRSA)' },
    { value: '', name: 'Microcephaly' },
    { value: '', name: 'Middle East Respiratory Syndrome (MERS)' },
    { value: '', name: 'Mononucleosis' },
    { value: '', name: 'Multiple Sclerosis' },
    { value: '', name: 'Ovarian Cysts' },
    { value: '', name: 'Overweight and Obesity' },
    { value: '', name: 'Parasites - Scables' },
    { value: '', name: 'Pediatrics' },
    { value: '', name: 'Pneumonia' },
    { value: '', name: 'Polycytic ovary syndrome' },
    { value: '', name: 'Psoriasis' },
    { value: '', name: 'Pubic Lice' },
    { value: '', name: 'Rash' },
    { value: '', name: 'Ringworm' },
    { value: '', name: 'Salmonella' },
    { value: '', name: 'Sciatica' },
    { value: '', name: 'Sexual health' },
    { value: '', name: 'Sexually Transmitted Diseases' },
    { value: '', name: 'Shingles' },
    { value: '', name: 'Sibo' },
    { value: '', name: 'Sinusitis' },
    { value: '', name: 'Skin' },
    { value: '', name: 'Sleep Apnea' },
    { value: '', name: 'Strep throat' },
    { value: '', name: 'Stress' },
    { value: '', name: 'Stroke' },
    { value: '', name: 'Substance abuse' },
    { value: '', name: 'Symptom' },
    { value: '', name: 'Thyroid' },
    { value: '', name: 'Tonsillitis' },
    { value: '', name: 'Traumatic Brain Injury (TBI)' },
    { value: '', name: 'Trichomonas Infection (Trichomoniasis)' },
    { value: '', name: 'Tuberculosis (TB)' },
    { value: '', name: 'Uncategorized' },
    { value: '', name: 'Urinary Tract Infection' },
    { value: '', name: 'Vaginal Discharge' },
    { value: '', name: 'Whooping Cough' },
    { value: '', name: 'Womens Health' },
    { value: '', name: 'Yeast Infection' },
    { value: '', name: 'Zika Virus' },

  ];

  ngOnInit(): void {
    this.userData.get_medical_condition().subscribe((result: any) => {
      this.medcon = result;
    })

    this.userData.get_document_page(this.tag).subscribe((result: any) => {
      this.medcon = result.data
      console.log('result', this.medcon);
    })

    // get_vaccine_list()   get_allergic_reaction()

    this.userData.get_vaccine_list().subscribe((result: any) => {
      this.medcon = result
    })

    this.userData.get_allergic_reaction().subscribe((result: any) => {
      this.medcon = result
    })

    this.myForm = this.formBuilder.group({
      conditionName: [''],
      yearOfDiagnosis: [''],
      comment: [''],

    });
  }


  save_Medcon(conditionName: any, yearOfDiagnosis: any, comment: any) {
    this.submitted = true;
    if (!Object.keys(this.profile_detail).includes('medicalCondition')) {
      this.profile_detail.medicalCondition = [{ "conditionName": conditionName, "yearOfDiagnosis": Number(yearOfDiagnosis), "comment": comment }];
      //this.profile_detail.medicalCondition.push(this.myForm.value)
    } else {

      this.profile_detail.medicalCondition.push({ "conditionName": conditionName, "yearOfDiagnosis": Number(yearOfDiagnosis), "comment": comment })
    }

    this.closeDialog()
  }


  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}



@Component({
  selector: 'app-medicaledit',
  templateUrl: './medical-edit.html',
  //styleUrls: ['./healthdashboard.component.css']
})
export class MedicalEditComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  medCon: any;
  submitted: any;
  save_Click: any;
  profile_detail: any;
  close: any;
  title: any;
  index_selected: any;
  i: any;
  dialog_status = '';
  profile_details: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<MedicalEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1])
    this.i = data[2]
    //this.dialog_status = data[3]
  }

  medical = [
    { value: '...', name: 'Select Condition' },
    { value: 'adhd', name: 'ADHD' },
    { value: 'abdominalpain', name: 'Abdominal pain' },
    { value: 'acne', name: 'Acne' },
    { value: 'allergies', name: 'Allergies' },
    { value: 'anemia', name: 'Anemia' },
    { value: 'antidepressants', name: 'Antidepressants' },
    { value: 'anxiety', name: 'Anxiety' },
    { value: 'appendicitis', name: 'Appendicitis' },
    { value: 'arthritis', name: 'Arthritis ' },
    { value: 'asthma', name: 'Asthma' },
    { value: 'autism', name: 'Autism' },
    { value: 'avian', name: 'Avian Influenza' },
    { value: 'bacterial', name: 'Bacterial Vaginosis' },
    { value: 'birthdefects', name: 'Birth defects' },
    { value: 'bladder', name: 'Bladder Infection' },
    { value: 'breast', name: 'Breast Abscess' },
    { value: 'bronchitis', name: 'Bronchitis' },
    { value: 'cancer', name: 'Cancer' },
    { value: 'cataracts', name: 'Cataracts' },
    { value: 'celiac', name: 'Celiac Disease' },
    { value: 'chickenpox', name: 'Chicken Pox' },
    { value: 'chlamydia', name: 'Chlamydia' },
    { value: 'cfs', name: 'Chronic Fatigue Syndrome' },
    { value: 'copd', name: 'Chronic Obstructive Pulmonary Disease (COPD)' },
    { value: 'chronic', name: 'Chronic Disease' },
    { value: 'cold', name: 'Cold' },
    { value: 'coldflu', name: 'Cold and Flu' },
    { value: 'colitis', name: 'Colitis' },
    { value: '', name: 'Conjunctivitis' },
    { value: '', name: 'Coronavirus' },
    { value: '', name: 'Crohns Disease' },
    { value: '', name: 'Croup' },
    { value: '', name: 'Dental Infection' },
    { value: '', name: 'Depression' },
    { value: '', name: 'Dermatitis' },
    { value: '', name: 'Diabetes' },
    { value: '', name: 'Ear Infection' },
    { value: '', name: 'Ear, Nose, and Throat' },
    { value: '', name: 'Ebola (Ebola Virus Disease)' },
    { value: '', name: 'Eczema' },
    { value: '', name: 'Endometriosis' },
    { value: '', name: 'Epilepsy' },
    { value: '', name: 'Erectile Dysfunction' },
    { value: '', name: 'Face and Mouth' },
    { value: '', name: 'Fast Facts' },
    { value: '', name: 'Fatigue' },
    { value: '', name: 'Fetal Alcohol Spectrum Disorder' },
    { value: '', name: 'Fibroids' },
    { value: '', name: 'Fibromyalgia' },
    { value: '', name: 'Fifth Disease' },
    { value: '', name: 'Flu (Influenza)' },
    { value: '', name: 'Food Poisoning' },
    { value: '', name: 'Gastritis' },
    { value: '', name: 'General Health' },
    { value: '', name: 'Genital Herpes (Herpes Simplex Virus' },
    { value: '', name: 'Gerd' },
    { value: '', name: 'Giardiasis' },
    { value: '', name: 'Gonorrhea' },
    { value: '', name: 'HIV/AIDS' },
    { value: '', name: 'Hand foot mouth disease' },
    { value: '', name: 'head Lice' },
    { value: '', name: 'Headaches' },
    { value: '', name: 'Health and Wellness' },
    { value: '', name: 'Heart Disease' },
    { value: '', name: 'Heart attack' },
    { value: '', name: 'Hepatitis' },
    { value: '', name: 'Hernia' },
    { value: '', name: 'Herpes' },
    { value: '', name: 'Hives' },
    { value: '', name: 'Human Papillomavirus (HPV)' },
    { value: '', name: 'Hypertension' },
    { value: '', name: 'Irritable Bowel Syndrome' },
    { value: '', name: 'Kidney Disease(Chronic Kidney Disease)' },
    { value: '', name: 'Layngitis' },
    { value: '', name: 'Lupus' },
    { value: '', name: 'Lyme Disease' },
    { value: '', name: 'Measles' },
    { value: '', name: 'Mens Health' },
    { value: '', name: 'Meningitis' },
    { value: '', name: 'Menstruation' },
    { value: '', name: 'Mental Health' },
    { value: '', name: 'Methicillin-resistant Staphylococcus aureus (MRSA)' },
    { value: '', name: 'Microcephaly' },
    { value: '', name: 'Middle East Respiratory Syndrome (MERS)' },
    { value: '', name: 'Mononucleosis' },
    { value: '', name: 'Multiple Sclerosis' },
    { value: '', name: 'Ovarian Cysts' },
    { value: '', name: 'Overweight and Obesity' },
    { value: '', name: 'Parasites - Scables' },
    { value: '', name: 'Pediatrics' },
    { value: '', name: 'Pneumonia' },
    { value: '', name: 'Polycytic ovary syndrome' },
    { value: '', name: 'Psoriasis' },
    { value: '', name: 'Pubic Lice' },
    { value: '', name: 'Rash' },
    { value: '', name: 'Ringworm' },
    { value: '', name: 'Salmonella' },
    { value: '', name: 'Sciatica' },
    { value: '', name: 'Sexual health' },
    { value: '', name: 'Sexually Transmitted Diseases' },
    { value: '', name: 'Shingles' },
    { value: '', name: 'Sibo' },
    { value: '', name: 'Sinusitis' },
    { value: '', name: 'Skin' },
    { value: '', name: 'Sleep Apnea' },
    { value: '', name: 'Strep throat' },
    { value: '', name: 'Stress' },
    { value: '', name: 'Stroke' },
    { value: '', name: 'Substance abuse' },
    { value: '', name: 'Symptom' },
    { value: '', name: 'Thyroid' },
    { value: '', name: 'Tonsillitis' },
    { value: '', name: 'Traumatic Brain Injury (TBI)' },
    { value: '', name: 'Trichomonas Infection (Trichomoniasis)' },
    { value: '', name: 'Tuberculosis (TB)' },
    { value: '', name: 'Uncategorized' },
    { value: '', name: 'Urinary Tract Infection' },
    { value: '', name: 'Vaginal Discharge' },
    { value: '', name: 'Whooping Cough' },
    { value: '', name: 'Womens Health' },
    { value: '', name: 'Yeast Infection' },
    { value: '', name: 'Zika Virus' },

  ];

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({
      conditionName: [''],
      yearOfDiagnosis: [''],
      comment: [''],

    });

    console.log(this.i)
    console.log(this.profile_detail)
  }

  medicalEdit(conditionName: any, yearOfDiagnosis: any, comment: any) {
    this.submitted = true;

    this.profile_detail.medicalCondition[this.i].conditionName = conditionName;
    this.profile_detail.medicalCondition[this.i].yearOfDiagnosis = yearOfDiagnosis;
    this.profile_detail.medicalCondition[this.i].comment = comment;

    this.dialogRef.close(this.profile_detail)
    console.log(this.profile_detail.medicalCondition)
    this.closeDialog()

  }

  delete_Medcon(conditionName: any, yearOfDiagnosis: any, comment: any) {
    this.submitted = true;
    this.profile_detail.medicalCondition.splice(this.i, 1) //index, element..
    this.dialogRef.close(this.profile_detail);
    console.log(this.profile_detail)
  }

  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }

}


@Component({
  selector: 'app-allergydialog',
  templateUrl: './allergy-dialog.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class AllergyDialogComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;
  i: any;
  allergy: any;


  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<AllergyDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1])
  }

  severitys = [
    { value: '...', name: 'Select Condition' },
    { value: 'low', name: 'Low' },
    { value: 'medium', name: 'Medium' },
    { value: 'high', name: 'High' },
  ]


  reactions = [
    { Allergic: 'Abdominal pain' },
    { Allergic: 'Anaphylaxis - severe multi system involvement' },
    { Allergic: 'Cough' },
    { Allergic: 'Diarrhea' },
    { Allergic: 'Difficulty swallowing' },
    { Allergic: 'Dizziness or Lightheadedness' },
  ];

  ngOnInit(): void {
    this.userData.get_medical_condition().subscribe((result: any) => {
      this.medcon = result;
    })

    this.userData.get_document_page(this.tag).subscribe((result: any) => {
      this.medcon = result.data
      console.log('result', this.medcon);
    })

    // get_vaccine_list()   get_allergic_reaction()

    this.userData.get_vaccine_list().subscribe((result: any) => {
      this.medcon = result
    })

    this.userData.get_allergic_reaction().subscribe((result: any) => {
      this.medcon = result
    })


  }

  save_Allergycon(allergicTo: any, allergicReaction: any, severity: any, comment: any) {
    this.submitted = true;
/*Another way for adding dialog boxes..*/ 
    let data =   {
      "allergicTo": allergicTo, 
      "allergicReaction": allergicReaction, 
      "severity": severity, 
      "comment": comment
    }
   /* if (!Object.keys(this.profile_detail).includes('allergy')) {
      this.profile_detail.allergy = [{ "allergicTo": allergicTo, "allergicReaction": allergicReaction, "severity": severity, "comment": comment }];
      //this.profile_detail.medicalCondition.push(this.myForm.value)
    } else {

      this.profile_detail.allergy.push({ "allergicTo": allergicTo, "allergicReaction": allergicReaction, "severity": severity, "comment": comment })
    }*/
    if(!Object.keys(this.profile_detail).includes('allergy')){
      this.profile_detail.allergy = [];
      this.profile_detail.allergy.push(data);
    } else {
      this.profile_detail.allergy.push(data);
    }

    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }




  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}

@Component({
  selector: 'app-allergyedit',
  templateUrl: './allergy-edit.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class AllergyEditComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;
  i: any;
  save_Click: any;
  close: any;
  index_selected: any;
  dialog_status = '';
  profile_details: any;


  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<AllergyEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1])
    this.i = data[2]
  }

  severitys = [
    { value: '...', name: 'Select Condition' },
    { value: 'low', name: 'Low' },
    { value: 'medium', name: 'Medium' },
    { value: 'high', name: 'High' },
  ]

  reactions = [
    { Allergic: 'Abdominal pain' },
    { Allergic: 'Anaphylaxis - severe multi system involvement' },
    { Allergic: 'Cough' },
    { Allergic: 'Diarrhea' },
    { Allergic: 'Difficulty swallowing' },
    { Allergic: 'Dizziness or Lightheadedness' },
  ];



  ngOnInit(): void {


    this.myForm = this.formBuilder.group({


    });

    console.log(this.i)
    console.log(this.profile_detail)
  }

  allergyEdit(allergicTo: any, allergicReaction: any, severity: any, comment: any) {
    this.submitted = true;

    this.profile_detail.allergy[this.i].allergicTo = allergicTo;
    this.profile_detail.allergy[this.i].allergicReaction = allergicReaction;
    this.profile_detail.allergy[this.i].severity = severity;
    this.profile_detail.allergy[this.i].comment = comment;

    this.dialogRef.close(this.profile_detail)
    console.log(this.profile_detail.allergy)
    this.closeDialog()
  }

  delete_Allergycon(allergicTo: any, allergicReaction: any, severity: any, comment: any) {
    this.submitted = true;
    this.profile_detail.allergy.splice(this.i, 1) //index, element..
    this.dialogRef.close(this.profile_detail);
    console.log(this.profile_detail)
  }

  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}

@Component({
  selector: 'app-medicationsdialog',
  templateUrl: './medications-dialog.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class MedicationsDialogComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<MedicationsDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1])
  }

  medical = [
    { value: '...', name: 'Select Condition' },
    { value: 'adhd', name: 'ADHD' },
    { value: 'abdominalpain', name: 'Abdominal pain' },
    { value: 'acne', name: 'Acne' },
    { value: 'allergies', name: 'Allergies' },
    { value: 'anemia', name: 'Anemia' },
    { value: 'antidepressants', name: 'Antidepressants' },
    { value: 'anxiety', name: 'Anxiety' },
    { value: 'appendicitis', name: 'Appendicitis' },
    { value: 'arthritis', name: 'Arthritis ' },
    { value: 'asthma', name: 'Asthma' },
    { value: 'autism', name: 'Autism' },
    { value: 'avian', name: 'Avian Influenza' },
    { value: 'bacterial', name: 'Bacterial Vaginosis' },
    { value: 'birthdefects', name: 'Birth defects' },
    { value: 'bladder', name: 'Bladder Infection' },
    { value: 'breast', name: 'Breast Abscess' },
    { value: 'bronchitis', name: 'Bronchitis' },
    { value: 'cancer', name: 'Cancer' },
    { value: 'cataracts', name: 'Cataracts' },
    { value: 'celiac', name: 'Celiac Disease' },
    { value: 'chickenpox', name: 'Chicken Pox' },
    { value: 'chlamydia', name: 'Chlamydia' },
    { value: 'cfs', name: 'Chronic Fatigue Syndrome' },
    { value: 'copd', name: 'Chronic Obstructive Pulmonary Disease (COPD)' },
    { value: 'chronic', name: 'Chronic Disease' },
    { value: 'cold', name: 'Cold' },
    { value: 'coldflu', name: 'Cold and Flu' },
    { value: 'colitis', name: 'Colitis' },
    { value: '', name: 'Conjunctivitis' },
    { value: '', name: 'Coronavirus' },
    { value: '', name: 'Crohns Disease' },
    { value: '', name: 'Croup' },
    { value: '', name: 'Dental Infection' },
    { value: '', name: 'Depression' },
    { value: '', name: 'Dermatitis' },
    { value: '', name: 'Diabetes' },
    { value: '', name: 'Ear Infection' },
    { value: '', name: 'Ear, Nose, and Throat' },
    { value: '', name: 'Ebola (Ebola Virus Disease)' },
    { value: '', name: 'Eczema' },
    { value: '', name: 'Endometriosis' },
    { value: '', name: 'Epilepsy' },
    { value: '', name: 'Erectile Dysfunction' },
    { value: '', name: 'Face and Mouth' },
    { value: '', name: 'Fast Facts' },
    { value: '', name: 'Fatigue' },
    { value: '', name: 'Fetal Alcohol Spectrum Disorder' },
    { value: '', name: 'Fibroids' },
    { value: '', name: 'Fibromyalgia' },
    { value: '', name: 'Fifth Disease' },
    { value: '', name: 'Flu (Influenza)' },
    { value: '', name: 'Food Poisoning' },
    { value: '', name: 'Gastritis' },
    { value: '', name: 'General Health' },
    { value: '', name: 'Genital Herpes (Herpes Simplex Virus' },
    { value: '', name: 'Gerd' },
    { value: '', name: 'Giardiasis' },
    { value: '', name: 'Gonorrhea' },
    { value: '', name: 'HIV/AIDS' },
    { value: '', name: 'Hand foot mouth disease' },
    { value: '', name: 'head Lice' },
    { value: '', name: 'Headaches' },
    { value: '', name: 'Health and Wellness' },
    { value: '', name: 'Heart Disease' },
    { value: '', name: 'Heart attack' },
    { value: '', name: 'Hepatitis' },
    { value: '', name: 'Hernia' },
    { value: '', name: 'Herpes' },
    { value: '', name: 'Hives' },
    { value: '', name: 'Human Papillomavirus (HPV)' },
    { value: '', name: 'Hypertension' },
    { value: '', name: 'Irritable Bowel Syndrome' },
    { value: '', name: 'Kidney Disease(Chronic Kidney Disease)' },
    { value: '', name: 'Layngitis' },
    { value: '', name: 'Lupus' },
    { value: '', name: 'Lyme Disease' },
    { value: '', name: 'Measles' },
    { value: '', name: 'Mens Health' },
    { value: '', name: 'Meningitis' },
    { value: '', name: 'Menstruation' },
    { value: '', name: 'Mental Health' },
    { value: '', name: 'Methicillin-resistant Staphylococcus aureus (MRSA)' },
    { value: '', name: 'Microcephaly' },
    { value: '', name: 'Middle East Respiratory Syndrome (MERS)' },
    { value: '', name: 'Mononucleosis' },
    { value: '', name: 'Multiple Sclerosis' },
    { value: '', name: 'Ovarian Cysts' },
    { value: '', name: 'Overweight and Obesity' },
    { value: '', name: 'Parasites - Scables' },
    { value: '', name: 'Pediatrics' },
    { value: '', name: 'Pneumonia' },
    { value: '', name: 'Polycytic ovary syndrome' },
    { value: '', name: 'Psoriasis' },
    { value: '', name: 'Pubic Lice' },
    { value: '', name: 'Rash' },
    { value: '', name: 'Ringworm' },
    { value: '', name: 'Salmonella' },
    { value: '', name: 'Sciatica' },
    { value: '', name: 'Sexual health' },
    { value: '', name: 'Sexually Transmitted Diseases' },
    { value: '', name: 'Shingles' },
    { value: '', name: 'Sibo' },
    { value: '', name: 'Sinusitis' },
    { value: '', name: 'Skin' },
    { value: '', name: 'Sleep Apnea' },
    { value: '', name: 'Strep throat' },
    { value: '', name: 'Stress' },
    { value: '', name: 'Stroke' },
    { value: '', name: 'Substance abuse' },
    { value: '', name: 'Symptom' },
    { value: '', name: 'Thyroid' },
    { value: '', name: 'Tonsillitis' },
    { value: '', name: 'Traumatic Brain Injury (TBI)' },
    { value: '', name: 'Trichomonas Infection (Trichomoniasis)' },
    { value: '', name: 'Tuberculosis (TB)' },
    { value: '', name: 'Uncategorized' },
    { value: '', name: 'Urinary Tract Infection' },
    { value: '', name: 'Vaginal Discharge' },
    { value: '', name: 'Whooping Cough' },
    { value: '', name: 'Womens Health' },
    { value: '', name: 'Yeast Infection' },
    { value: '', name: 'Zika Virus' },

  ];

  unitz = [
    { value: '...', name: 'Select Unit' },
    { value: ' ', name: 'g' },
    { value: ' ', name: 'UI' },
    { value: ' ', name: 'mcg' },
    { value: ' ', name: 'mcg/hr' },
    { value: ' ', name: 'mcg/ml' },
    { value: ' ', name: 'mEq' },
    { value: ' ', name: 'mg' },
    { value: ' ', name: 'mg/cm2' },
    { value: ' ', name: 'mg/g' },
    { value: ' ', name: 'mg/ml' },
    { value: ' ', name: 'mL' },
    { value: ' ', name: '%' },
  ];

  frequencyz = [
    { value: '...', name: 'Select Status' },
    { value: ' ', name: 'As Needed' },
    { value: ' ', name: 'Daily' },
  ];

  ngOnInit(): void {
    this.userData.get_medical_condition().subscribe((result: any) => {
      this.medcon = result;
    })

    this.userData.get_document_page(this.tag).subscribe((result: any) => {
      this.medcon = result.data
      console.log('result', this.medcon);
    })

    // get_vaccine_list()   get_allergic_reaction()

    this.userData.get_vaccine_list().subscribe((result: any) => {
      this.medcon = result
    })

    this.userData.get_allergic_reaction().subscribe((result: any) => {
      this.medcon = result
    })
  }

  save_Medication(medCondition: any, medicationName: any, strength: any, unit: any, startDate: any, endDate: any, frequency: any, comment: any) {
    this.submitted = true;
    if (!Object.keys(this.profile_detail).includes('allergy')) {
      this.profile_detail.medication = [{ "medCondition": medCondition, "medicationName": medicationName, "strength": strength, "unit": unit, "startDate": startDate, "endDate": endDate, "frequency": frequency, "comment": comment }];
      //this.profile_detail.medicalCondition.push(this.myForm.value)
    } else {

      this.profile_detail.medication.push({ "medCondition": medCondition, "medicationName": medicationName, "strength": strength, "unit": unit, "startDate": startDate, "endDate": endDate, "frequency": frequency, "comment": comment })
    }

    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}


@Component({
  selector: 'app-medicationsedit',
  templateUrl: './medications-edit.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class MedicationsEditComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;
  i: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<MedicationsEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1]),
      this.i = data[2]
  }

  medical = [
    { value: '...', name: 'Select Condition' },
    { value: 'adhd', name: 'ADHD' },
    { value: 'abdominalpain', name: 'Abdominal pain' },
    { value: 'acne', name: 'Acne' },
    { value: 'allergies', name: 'Allergies' },
    { value: 'anemia', name: 'Anemia' },
    { value: 'antidepressants', name: 'Antidepressants' },
    { value: 'anxiety', name: 'Anxiety' },
    { value: 'appendicitis', name: 'Appendicitis' },
    { value: 'arthritis', name: 'Arthritis ' },
    { value: 'asthma', name: 'Asthma' },
    { value: 'autism', name: 'Autism' },
    { value: 'avian', name: 'Avian Influenza' },
    { value: 'bacterial', name: 'Bacterial Vaginosis' },
    { value: 'birthdefects', name: 'Birth defects' },
    { value: 'bladder', name: 'Bladder Infection' },
    { value: 'breast', name: 'Breast Abscess' },
    { value: 'bronchitis', name: 'Bronchitis' },
    { value: 'cancer', name: 'Cancer' },
    { value: 'cataracts', name: 'Cataracts' },
    { value: 'celiac', name: 'Celiac Disease' },
    { value: 'chickenpox', name: 'Chicken Pox' },
    { value: 'chlamydia', name: 'Chlamydia' },
    { value: 'cfs', name: 'Chronic Fatigue Syndrome' },
    { value: 'copd', name: 'Chronic Obstructive Pulmonary Disease (COPD)' },
    { value: 'chronic', name: 'Chronic Disease' },
    { value: 'cold', name: 'Cold' },
    { value: 'coldflu', name: 'Cold and Flu' },
    { value: 'colitis', name: 'Colitis' },
    { value: '', name: 'Conjunctivitis' },
    { value: '', name: 'Coronavirus' },
    { value: '', name: 'Crohns Disease' },
    { value: '', name: 'Croup' },
    { value: '', name: 'Dental Infection' },
    { value: '', name: 'Depression' },
    { value: '', name: 'Dermatitis' },
    { value: '', name: 'Diabetes' },
    { value: '', name: 'Ear Infection' },
    { value: '', name: 'Ear, Nose, and Throat' },
    { value: '', name: 'Ebola (Ebola Virus Disease)' },
    { value: '', name: 'Eczema' },
    { value: '', name: 'Endometriosis' },
    { value: '', name: 'Epilepsy' },
    { value: '', name: 'Erectile Dysfunction' },
    { value: '', name: 'Face and Mouth' },
    { value: '', name: 'Fast Facts' },
    { value: '', name: 'Fatigue' },
    { value: '', name: 'Fetal Alcohol Spectrum Disorder' },
    { value: '', name: 'Fibroids' },
    { value: '', name: 'Fibromyalgia' },
    { value: '', name: 'Fifth Disease' },
    { value: '', name: 'Flu (Influenza)' },
    { value: '', name: 'Food Poisoning' },
    { value: '', name: 'Gastritis' },
    { value: '', name: 'General Health' },
    { value: '', name: 'Genital Herpes (Herpes Simplex Virus' },
    { value: '', name: 'Gerd' },
    { value: '', name: 'Giardiasis' },
    { value: '', name: 'Gonorrhea' },
    { value: '', name: 'HIV/AIDS' },
    { value: '', name: 'Hand foot mouth disease' },
    { value: '', name: 'head Lice' },
    { value: '', name: 'Headaches' },
    { value: '', name: 'Health and Wellness' },
    { value: '', name: 'Heart Disease' },
    { value: '', name: 'Heart attack' },
    { value: '', name: 'Hepatitis' },
    { value: '', name: 'Hernia' },
    { value: '', name: 'Herpes' },
    { value: '', name: 'Hives' },
    { value: '', name: 'Human Papillomavirus (HPV)' },
    { value: '', name: 'Hypertension' },
    { value: '', name: 'Irritable Bowel Syndrome' },
    { value: '', name: 'Kidney Disease(Chronic Kidney Disease)' },
    { value: '', name: 'Layngitis' },
    { value: '', name: 'Lupus' },
    { value: '', name: 'Lyme Disease' },
    { value: '', name: 'Measles' },
    { value: '', name: 'Mens Health' },
    { value: '', name: 'Meningitis' },
    { value: '', name: 'Menstruation' },
    { value: '', name: 'Mental Health' },
    { value: '', name: 'Methicillin-resistant Staphylococcus aureus (MRSA)' },
    { value: '', name: 'Microcephaly' },
    { value: '', name: 'Middle East Respiratory Syndrome (MERS)' },
    { value: '', name: 'Mononucleosis' },
    { value: '', name: 'Multiple Sclerosis' },
    { value: '', name: 'Ovarian Cysts' },
    { value: '', name: 'Overweight and Obesity' },
    { value: '', name: 'Parasites - Scables' },
    { value: '', name: 'Pediatrics' },
    { value: '', name: 'Pneumonia' },
    { value: '', name: 'Polycytic ovary syndrome' },
    { value: '', name: 'Psoriasis' },
    { value: '', name: 'Pubic Lice' },
    { value: '', name: 'Rash' },
    { value: '', name: 'Ringworm' },
    { value: '', name: 'Salmonella' },
    { value: '', name: 'Sciatica' },
    { value: '', name: 'Sexual health' },
    { value: '', name: 'Sexually Transmitted Diseases' },
    { value: '', name: 'Shingles' },
    { value: '', name: 'Sibo' },
    { value: '', name: 'Sinusitis' },
    { value: '', name: 'Skin' },
    { value: '', name: 'Sleep Apnea' },
    { value: '', name: 'Strep throat' },
    { value: '', name: 'Stress' },
    { value: '', name: 'Stroke' },
    { value: '', name: 'Substance abuse' },
    { value: '', name: 'Symptom' },
    { value: '', name: 'Thyroid' },
    { value: '', name: 'Tonsillitis' },
    { value: '', name: 'Traumatic Brain Injury (TBI)' },
    { value: '', name: 'Trichomonas Infection (Trichomoniasis)' },
    { value: '', name: 'Tuberculosis (TB)' },
    { value: '', name: 'Uncategorized' },
    { value: '', name: 'Urinary Tract Infection' },
    { value: '', name: 'Vaginal Discharge' },
    { value: '', name: 'Whooping Cough' },
    { value: '', name: 'Womens Health' },
    { value: '', name: 'Yeast Infection' },
    { value: '', name: 'Zika Virus' },

  ];

  unitz = [
    { value: '...', name: 'Select Unit' },
    { value: ' ', name: 'g' },
    { value: ' ', name: 'UI' },
    { value: ' ', name: 'mcg' },
    { value: ' ', name: 'mcg/hr' },
    { value: ' ', name: 'mcg/ml' },
    { value: ' ', name: 'mEq' },
    { value: ' ', name: 'mg' },
    { value: ' ', name: 'mg/cm2' },
    { value: ' ', name: 'mg/g' },
    { value: ' ', name: 'mg/ml' },
    { value: ' ', name: 'mL' },
    { value: ' ', name: '%' },
  ];

  frequencyz = [
    { value: '...', name: 'Select Status' },
    { value: ' ', name: 'As Needed' },
    { value: ' ', name: 'Daily' },
  ];

  ngOnInit(): void {


    this.myForm = this.formBuilder.group({


    });

    console.log(this.i)
    console.log(this.profile_detail)
  }

  medicationEdit(medCondition: any, medicationName: any, strength: any, unit: any, startDate: any, endDate: any, frequency: any, comment: any) {
    this.submitted = true;

    this.profile_detail.medication[this.i].medCondition = medCondition;
    this.profile_detail.medication[this.i].medicationName = medicationName;
    this.profile_detail.medication[this.i].strength = strength;
    this.profile_detail.medication[this.i].unit = unit;
    this.profile_detail.medication[this.i].startDate = startDate;
    this.profile_detail.medication[this.i].endDate = endDate;
    this.profile_detail.medication[this.i].frequency = frequency;
    this.profile_detail.medication[this.i].comment = comment;

    this.dialogRef.close(this.profile_detail)
    console.log(this.profile_detail.medication)
    this.closeDialog()

  }

  delete_Medication(medCondition: any, medicationName: any, strength: any, unit: any, startDate: any, endDate: any, frequency: any, comment: any) {
    this.submitted = true;
    this.profile_detail.medication.splice(this.i, 1) //index, element..
    this.dialogRef.close(this.profile_detail);
    console.log(this.profile_detail)
  }


  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }


  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}


@Component({
  selector: 'app-familydialog',
  templateUrl: './family-dialog.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class FamilyDialogComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<FamilyDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1])
  }

  medical = [
    { value: '...', name: 'Select Condition' },
    { value: 'adhd', name: 'ADHD' },
    { value: 'abdominalpain', name: 'Abdominal pain' },
    { value: 'acne', name: 'Acne' },
    { value: 'allergies', name: 'Allergies' },
    { value: 'anemia', name: 'Anemia' },
    { value: 'antidepressants', name: 'Antidepressants' },
    { value: 'anxiety', name: 'Anxiety' },
    { value: 'appendicitis', name: 'Appendicitis' },
    { value: 'arthritis', name: 'Arthritis ' },
    { value: 'asthma', name: 'Asthma' },
    { value: 'autism', name: 'Autism' },
    { value: 'avian', name: 'Avian Influenza' },
    { value: 'bacterial', name: 'Bacterial Vaginosis' },
    { value: 'birthdefects', name: 'Birth defects' },
    { value: 'bladder', name: 'Bladder Infection' },
    { value: 'breast', name: 'Breast Abscess' },
    { value: 'bronchitis', name: 'Bronchitis' },
    { value: 'cancer', name: 'Cancer' },
    { value: 'cataracts', name: 'Cataracts' },
    { value: 'celiac', name: 'Celiac Disease' },
    { value: 'chickenpox', name: 'Chicken Pox' },
    { value: 'chlamydia', name: 'Chlamydia' },
    { value: 'cfs', name: 'Chronic Fatigue Syndrome' },
    { value: 'copd', name: 'Chronic Obstructive Pulmonary Disease (COPD)' },
    { value: 'chronic', name: 'Chronic Disease' },
    { value: 'cold', name: 'Cold' },
    { value: 'coldflu', name: 'Cold and Flu' },
    { value: 'colitis', name: 'Colitis' },
    { value: '', name: 'Conjunctivitis' },
    { value: '', name: 'Coronavirus' },
    { value: '', name: 'Crohns Disease' },
    { value: '', name: 'Croup' },
    { value: '', name: 'Dental Infection' },
    { value: '', name: 'Depression' },
    { value: '', name: 'Dermatitis' },
    { value: '', name: 'Diabetes' },
    { value: '', name: 'Ear Infection' },
    { value: '', name: 'Ear, Nose, and Throat' },
    { value: '', name: 'Ebola (Ebola Virus Disease)' },
    { value: '', name: 'Eczema' },
    { value: '', name: 'Endometriosis' },
    { value: '', name: 'Epilepsy' },
    { value: '', name: 'Erectile Dysfunction' },
    { value: '', name: 'Face and Mouth' },
    { value: '', name: 'Fast Facts' },
    { value: '', name: 'Fatigue' },
    { value: '', name: 'Fetal Alcohol Spectrum Disorder' },
    { value: '', name: 'Fibroids' },
    { value: '', name: 'Fibromyalgia' },
    { value: '', name: 'Fifth Disease' },
    { value: '', name: 'Flu (Influenza)' },
    { value: '', name: 'Food Poisoning' },
    { value: '', name: 'Gastritis' },
    { value: '', name: 'General Health' },
    { value: '', name: 'Genital Herpes (Herpes Simplex Virus' },
    { value: '', name: 'Gerd' },
    { value: '', name: 'Giardiasis' },
    { value: '', name: 'Gonorrhea' },
    { value: '', name: 'HIV/AIDS' },
    { value: '', name: 'Hand foot mouth disease' },
    { value: '', name: 'head Lice' },
    { value: '', name: 'Headaches' },
    { value: '', name: 'Health and Wellness' },
    { value: '', name: 'Heart Disease' },
    { value: '', name: 'Heart attack' },
    { value: '', name: 'Hepatitis' },
    { value: '', name: 'Hernia' },
    { value: '', name: 'Herpes' },
    { value: '', name: 'Hives' },
    { value: '', name: 'Human Papillomavirus (HPV)' },
    { value: '', name: 'Hypertension' },
    { value: '', name: 'Irritable Bowel Syndrome' },
    { value: '', name: 'Kidney Disease(Chronic Kidney Disease)' },
    { value: '', name: 'Layngitis' },
    { value: '', name: 'Lupus' },
    { value: '', name: 'Lyme Disease' },
    { value: '', name: 'Measles' },
    { value: '', name: 'Mens Health' },
    { value: '', name: 'Meningitis' },
    { value: '', name: 'Menstruation' },
    { value: '', name: 'Mental Health' },
    { value: '', name: 'Methicillin-resistant Staphylococcus aureus (MRSA)' },
    { value: '', name: 'Microcephaly' },
    { value: '', name: 'Middle East Respiratory Syndrome (MERS)' },
    { value: '', name: 'Mononucleosis' },
    { value: '', name: 'Multiple Sclerosis' },
    { value: '', name: 'Ovarian Cysts' },
    { value: '', name: 'Overweight and Obesity' },
    { value: '', name: 'Parasites - Scables' },
    { value: '', name: 'Pediatrics' },
    { value: '', name: 'Pneumonia' },
    { value: '', name: 'Polycytic ovary syndrome' },
    { value: '', name: 'Psoriasis' },
    { value: '', name: 'Pubic Lice' },
    { value: '', name: 'Rash' },
    { value: '', name: 'Ringworm' },
    { value: '', name: 'Salmonella' },
    { value: '', name: 'Sciatica' },
    { value: '', name: 'Sexual health' },
    { value: '', name: 'Sexually Transmitted Diseases' },
    { value: '', name: 'Shingles' },
    { value: '', name: 'Sibo' },
    { value: '', name: 'Sinusitis' },
    { value: '', name: 'Skin' },
    { value: '', name: 'Sleep Apnea' },
    { value: '', name: 'Strep throat' },
    { value: '', name: 'Stress' },
    { value: '', name: 'Stroke' },
    { value: '', name: 'Substance abuse' },
    { value: '', name: 'Symptom' },
    { value: '', name: 'Thyroid' },
    { value: '', name: 'Tonsillitis' },
    { value: '', name: 'Traumatic Brain Injury (TBI)' },
    { value: '', name: 'Trichomonas Infection (Trichomoniasis)' },
    { value: '', name: 'Tuberculosis (TB)' },
    { value: '', name: 'Uncategorized' },
    { value: '', name: 'Urinary Tract Infection' },
    { value: '', name: 'Vaginal Discharge' },
    { value: '', name: 'Whooping Cough' },
    { value: '', name: 'Womens Health' },
    { value: '', name: 'Yeast Infection' },
    { value: '', name: 'Zika Virus' },

  ];

  reactions = [
    { Allergic: 'Mother' },
    { Allergic: 'Father' },
    { Allergic: 'Son' },
    { Allergic: 'Daughter' },
    { Allergic: 'Friend' },
    { Allergic: 'Others' },
  ];

  ngOnInit(): void {
    this.userData.get_medical_condition().subscribe((result: any) => {
      this.medcon = result;
    })

    this.userData.get_document_page(this.tag).subscribe((result: any) => {
      this.medcon = result.data
      console.log('result', this.medcon);
    })

    // get_vaccine_list()   get_allergic_reaction()

    this.userData.get_vaccine_list().subscribe((result: any) => {
      this.medcon = result
    })

    this.userData.get_allergic_reaction().subscribe((result: any) => {
      this.medcon = result
    })
  }

  save_Familycon(conditionName: any, relationship: any, comment: any) {
    this.submitted = true;
    if (!Object.keys(this.profile_detail).includes('allergy')) {
      this.profile_detail.familyHistory = [{ "conditionName": conditionName, "relationship": relationship, "comment": comment }];
      //this.profile_detail.medicalCondition.push(this.myForm.value)
    } else {

      this.profile_detail.familyHistory.push({ "conditionName": conditionName, "relationship": relationship, "comment": comment })
    }

    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}


@Component({
  selector: 'app-familyedit',
  templateUrl: './family-edit.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class FamilyEditComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;
  i: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<FamilyEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1]),
      this.i = data[2]
  }

  medical = [
    { value: '...', name: 'Select Condition' },
    { value: 'adhd', name: 'ADHD' },
    { value: 'abdominalpain', name: 'Abdominal pain' },
    { value: 'acne', name: 'Acne' },
    { value: 'allergies', name: 'Allergies' },
    { value: 'anemia', name: 'Anemia' },
    { value: 'antidepressants', name: 'Antidepressants' },
    { value: 'anxiety', name: 'Anxiety' },
    { value: 'appendicitis', name: 'Appendicitis' },
    { value: 'arthritis', name: 'Arthritis ' },
    { value: 'asthma', name: 'Asthma' },
    { value: 'autism', name: 'Autism' },
    { value: 'avian', name: 'Avian Influenza' },
    { value: 'bacterial', name: 'Bacterial Vaginosis' },
    { value: 'birthdefects', name: 'Birth defects' },
    { value: 'bladder', name: 'Bladder Infection' },
    { value: 'breast', name: 'Breast Abscess' },
    { value: 'bronchitis', name: 'Bronchitis' },
    { value: 'cancer', name: 'Cancer' },
    { value: 'cataracts', name: 'Cataracts' },
    { value: 'celiac', name: 'Celiac Disease' },
    { value: 'chickenpox', name: 'Chicken Pox' },
    { value: 'chlamydia', name: 'Chlamydia' },
    { value: 'cfs', name: 'Chronic Fatigue Syndrome' },
    { value: 'copd', name: 'Chronic Obstructive Pulmonary Disease (COPD)' },
    { value: 'chronic', name: 'Chronic Disease' },
    { value: 'cold', name: 'Cold' },
    { value: 'coldflu', name: 'Cold and Flu' },
    { value: 'colitis', name: 'Colitis' },
    { value: '', name: 'Conjunctivitis' },
    { value: '', name: 'Coronavirus' },
    { value: '', name: 'Crohns Disease' },
    { value: '', name: 'Croup' },
    { value: '', name: 'Dental Infection' },
    { value: '', name: 'Depression' },
    { value: '', name: 'Dermatitis' },
    { value: '', name: 'Diabetes' },
    { value: '', name: 'Ear Infection' },
    { value: '', name: 'Ear, Nose, and Throat' },
    { value: '', name: 'Ebola (Ebola Virus Disease)' },
    { value: '', name: 'Eczema' },
    { value: '', name: 'Endometriosis' },
    { value: '', name: 'Epilepsy' },
    { value: '', name: 'Erectile Dysfunction' },
    { value: '', name: 'Face and Mouth' },
    { value: '', name: 'Fast Facts' },
    { value: '', name: 'Fatigue' },
    { value: '', name: 'Fetal Alcohol Spectrum Disorder' },
    { value: '', name: 'Fibroids' },
    { value: '', name: 'Fibromyalgia' },
    { value: '', name: 'Fifth Disease' },
    { value: '', name: 'Flu (Influenza)' },
    { value: '', name: 'Food Poisoning' },
    { value: '', name: 'Gastritis' },
    { value: '', name: 'General Health' },
    { value: '', name: 'Genital Herpes (Herpes Simplex Virus' },
    { value: '', name: 'Gerd' },
    { value: '', name: 'Giardiasis' },
    { value: '', name: 'Gonorrhea' },
    { value: '', name: 'HIV/AIDS' },
    { value: '', name: 'Hand foot mouth disease' },
    { value: '', name: 'head Lice' },
    { value: '', name: 'Headaches' },
    { value: '', name: 'Health and Wellness' },
    { value: '', name: 'Heart Disease' },
    { value: '', name: 'Heart attack' },
    { value: '', name: 'Hepatitis' },
    { value: '', name: 'Hernia' },
    { value: '', name: 'Herpes' },
    { value: '', name: 'Hives' },
    { value: '', name: 'Human Papillomavirus (HPV)' },
    { value: '', name: 'Hypertension' },
    { value: '', name: 'Irritable Bowel Syndrome' },
    { value: '', name: 'Kidney Disease(Chronic Kidney Disease)' },
    { value: '', name: 'Layngitis' },
    { value: '', name: 'Lupus' },
    { value: '', name: 'Lyme Disease' },
    { value: '', name: 'Measles' },
    { value: '', name: 'Mens Health' },
    { value: '', name: 'Meningitis' },
    { value: '', name: 'Menstruation' },
    { value: '', name: 'Mental Health' },
    { value: '', name: 'Methicillin-resistant Staphylococcus aureus (MRSA)' },
    { value: '', name: 'Microcephaly' },
    { value: '', name: 'Middle East Respiratory Syndrome (MERS)' },
    { value: '', name: 'Mononucleosis' },
    { value: '', name: 'Multiple Sclerosis' },
    { value: '', name: 'Ovarian Cysts' },
    { value: '', name: 'Overweight and Obesity' },
    { value: '', name: 'Parasites - Scables' },
    { value: '', name: 'Pediatrics' },
    { value: '', name: 'Pneumonia' },
    { value: '', name: 'Polycytic ovary syndrome' },
    { value: '', name: 'Psoriasis' },
    { value: '', name: 'Pubic Lice' },
    { value: '', name: 'Rash' },
    { value: '', name: 'Ringworm' },
    { value: '', name: 'Salmonella' },
    { value: '', name: 'Sciatica' },
    { value: '', name: 'Sexual health' },
    { value: '', name: 'Sexually Transmitted Diseases' },
    { value: '', name: 'Shingles' },
    { value: '', name: 'Sibo' },
    { value: '', name: 'Sinusitis' },
    { value: '', name: 'Skin' },
    { value: '', name: 'Sleep Apnea' },
    { value: '', name: 'Strep throat' },
    { value: '', name: 'Stress' },
    { value: '', name: 'Stroke' },
    { value: '', name: 'Substance abuse' },
    { value: '', name: 'Symptom' },
    { value: '', name: 'Thyroid' },
    { value: '', name: 'Tonsillitis' },
    { value: '', name: 'Traumatic Brain Injury (TBI)' },
    { value: '', name: 'Trichomonas Infection (Trichomoniasis)' },
    { value: '', name: 'Tuberculosis (TB)' },
    { value: '', name: 'Uncategorized' },
    { value: '', name: 'Urinary Tract Infection' },
    { value: '', name: 'Vaginal Discharge' },
    { value: '', name: 'Whooping Cough' },
    { value: '', name: 'Womens Health' },
    { value: '', name: 'Yeast Infection' },
    { value: '', name: 'Zika Virus' },

  ];

  reactions = [
    { Allergic: 'Mother' },
    { Allergic: 'Father' },
    { Allergic: 'Son' },
    { Allergic: 'Daughter' },
    { Allergic: 'Friend' },
    { Allergic: 'Others' },
  ];

  ngOnInit(): void {


    this.myForm = this.formBuilder.group({


    });

    console.log(this.i)
    console.log(this.profile_detail)
  }

  familyEdit(conditionName: any, relationship: any, comment: any) {
    this.submitted = true;

    this.profile_detail.familyHistory[this.i].conditionName = conditionName;
    this.profile_detail.familyHistory[this.i].relationship = relationship;
    this.profile_detail.familyHistory[this.i].comment = comment;

    this.dialogRef.close(this.profile_detail)
    console.log(this.profile_detail.familyHistory)
    this.closeDialog()

  }

  delete_Familycon(conditionName: any, relationship: any, comment: any) {
    this.submitted = true;
    this.profile_detail.familyHistory.splice(this.i, 1) //index, element..
    this.dialogRef.close(this.profile_detail);
    console.log(this.profile_detail)
  }

  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}


@Component({
  selector: 'app-insurancedialog',
  templateUrl: './insurance-dialog.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class InsuranceDialogComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<InsuranceDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1])
  }

  statuse = [
    { value: '...', name: 'Select Status' },
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'InActive' },
  ]

  ngOnInit(): void {
    this.userData.get_medical_condition().subscribe((result: any) => {
      this.medcon = result;
    })

    this.userData.get_document_page(this.tag).subscribe((result: any) => {
      this.medcon = result.data
      console.log('result', this.medcon);
    })

    // get_vaccine_list()   get_allergic_reaction()

    this.userData.get_vaccine_list().subscribe((result: any) => {
      this.medcon = result
    })

    this.userData.get_allergic_reaction().subscribe((result: any) => {
      this.medcon = result
    })
  }

  save_Insurance(insuranceCompany: any, policyNumber: any, memberId: any, groupNumber: any, planName: any, startDate: any, endDate: any, status: any, comment: any) {
    this.submitted = true;
    if (!Object.keys(this.profile_detail).includes('allergy')) {
      this.profile_detail.insurance = [{ "insuranceCompany": insuranceCompany, "policyNumber": policyNumber, "memberId": memberId, "groupNumber": groupNumber, "planName": planName, "startDate": startDate, "endDate": endDate, "status": status, "comment": comment }];
      //this.profile_detail.medicalCondition.push(this.myForm.value)
    } else {

      this.profile_detail.insurance.push({ "insuranceCompany": insuranceCompany, "policyNumber": policyNumber, "memberId": memberId, "groupNumber": groupNumber, "planName": planName, "startDate": startDate, "endDate": endDate, "status": status, "comment": comment })
    }

    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}

@Component({
  selector: 'app-insuranceedit',
  templateUrl: './insurance-edit.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class InsuranceEditComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;
  i: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<InsuranceEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1]),
      this.i = data[2]
  }

  statuse = [
    { value: '...', name: 'Select Status' },
    { value: 'active', name: 'Active' },
    { value: 'inactive', name: 'InActive' },
  ]

  ngOnInit(): void {

    this.myForm = this.formBuilder.group({


    });

    console.log(this.i)
    console.log(this.profile_detail)
  }

  insuranceEdit(insuranceCompany: any, policyNumber: any, memberId: any, groupNumber: any, planName: any, startDate: any, endDate: any, status: any, comment: any) {
    this.submitted = true;

    this.profile_detail.insurance[this.i].insuranceCompany = insuranceCompany;
    this.profile_detail.insurance[this.i].policyNumber = policyNumber;
    this.profile_detail.insurance[this.i].memberId = memberId;
    this.profile_detail.insurance[this.i].groupNumber = groupNumber;
    this.profile_detail.insurance[this.i].planName = planName;
    this.profile_detail.insurance[this.i].startDate = startDate;
    this.profile_detail.insurance[this.i].endDate = endDate;
    this.profile_detail.insurance[this.i].status = status;
    this.profile_detail.insurance[this.i].comment = comment;

    this.dialogRef.close(this.profile_detail)
    console.log(this.profile_detail.insurance)
    this.closeDialog()

  }

  delete_Insurance(insuranceCompany: any, policyNumber: any, memberId: any, groupNumber: any, planName: any, startDate: any, endDate: any, status: any, comment: any) {
    this.submitted = true;
    this.profile_detail.insurance.splice(this.i, 1) //index, element..
    this.dialogRef.close(this.profile_detail);
    console.log(this.profile_detail)
  }


  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}

@Component({
  selector: 'app-immunizationdialog',
  templateUrl: './immunization-dialog.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class ImmunizationDialogComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ImmunizationDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1])
  }

  immunization = [
    { value: '...', name: 'Select Immunization' },
    { value: '', name: 'COVID-19 Vaccine' },
    { value: '', name: 'Haemophilus influenzae type b (Hib)' },
    { value: '', name: 'Hepatitis A (HepA)' },
    { value: '', name: 'Hepatitis B (HepB)' },
    { value: '', name: 'Human papillomavirus (HPV)' },
    { value: '', name: 'Influenza inactivated (IIV)' },
    { value: '', name: 'Influenza live attenuated (LAIV4)' },
    { value: '', name: 'Influenza recombinant (RIV4)' },
    { value: '', name: 'Measles, mumps, rubella (MMR)' },
    { value: '', name: 'Meningococcal A, C, W, Y (MenACWY)' },
    { value: '', name: 'Pneumococcal conjugate (PCV13)' },
    { value: '', name: 'Pneumococcal polysaccharide (PPSV23)' },
    { value: '', name: 'Shingles' },
    { value: '', name: 'Tetanus, Diphtheria, Pertussis (Tdap or Td)' },
    { value: '', name: 'Varicella (VAR)' },
    { value: '', name: 'Zoster recombinant (RZV)' },

  ]

  ngOnInit(): void {
    this.userData.get_medical_condition().subscribe((result: any) => {
      this.medcon = result;
    })

    this.userData.get_document_page(this.tag).subscribe((result: any) => {
      this.medcon = result.data
      console.log('result', this.medcon);
    })

    // get_vaccine_list()   get_allergic_reaction()

    this.userData.get_vaccine_list().subscribe((result: any) => {
      this.medcon = result
    })

    this.userData.get_allergic_reaction().subscribe((result: any) => {
      this.medcon = result
    })
  }

  save_Immunization(vaccineName: any, adminDate: any, nextDueDate: any, comment: any) {
    this.submitted = true;
    if (!Object.keys(this.profile_detail).includes('allergy')) {
      this.profile_detail.immunization = [{ "vaccineName": vaccineName, "adminDate": adminDate, "nextDueDate": nextDueDate, "comment": comment }];
      //this.profile_detail.medicalCondition.push(this.myForm.value)
    } else {

      this.profile_detail.immunization.push({ "vaccineName": vaccineName, "adminDate": adminDate, "nextDueDate": nextDueDate, "comment": comment })
    }

    this.closeDialog()
  }

  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}

@Component({
  selector: 'app-immunizationedit',
  templateUrl: './immunization-edit.html',
  //styleUrls: ['./healthdashboard.component.css']
})

export class ImmunizationEditComponent implements OnInit {

  myForm: any;
  medcon: any;
  tag: any;
  submitted: any;
  profile_detail: any;
  title: any;
  i: any;

  constructor(public dialog: MatDialog,
    public dialogRef: MatDialogRef<ImmunizationEditComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private userData: UsersDataService,
    private router: Router,
    private toast: ToastrService) {
    this.title = data[0],
      this.profile_detail = Object.assign({}, data[1]),
      this.i = data[2]
  }

  immunization = [
    { value: '...', name: 'Select Immunization' },
    { value: '', name: 'COVID-19 Vaccine' },
    { value: '', name: 'Haemophilus influenzae type b (Hib)' },
    { value: '', name: 'Hepatitis A (HepA)' },
    { value: '', name: 'Hepatitis B (HepB)' },
    { value: '', name: 'Human papillomavirus (HPV)' },
    { value: '', name: 'Influenza inactivated (IIV)' },
    { value: '', name: 'Influenza live attenuated (LAIV4)' },
    { value: '', name: 'Influenza recombinant (RIV4)' },
    { value: '', name: 'Measles, mumps, rubella (MMR)' },
    { value: '', name: 'Meningococcal A, C, W, Y (MenACWY)' },
    { value: '', name: 'Pneumococcal conjugate (PCV13)' },
    { value: '', name: 'Pneumococcal polysaccharide (PPSV23)' },
    { value: '', name: 'Shingles' },
    { value: '', name: 'Tetanus, Diphtheria, Pertussis (Tdap or Td)' },
    { value: '', name: 'Varicella (VAR)' },
    { value: '', name: 'Zoster recombinant (RZV)' },

  ]

  ngOnInit(): void {


    this.myForm = this.formBuilder.group({
      conditionName: [''],
      yearOfDiagnosis: [''],
      comment: [''],

    });

    console.log(this.i)
    console.log(this.profile_detail)
  }

  immunizationEdit(vaccineName: any, adminDate: any, nextDueDate: any, comment: any) {
    this.submitted = true;

    this.profile_detail.immunization[this.i].vaccineName = vaccineName;
    this.profile_detail.immunization[this.i].adminDate = adminDate;
    this.profile_detail.immunization[this.i].nextDueDate = nextDueDate;
    this.profile_detail.immunization[this.i].comment = comment;

    this.dialogRef.close(this.profile_detail)
    console.log(this.profile_detail.immunization)
    this.closeDialog()

  }

  delete_Immunization(vaccineName: any, adminDate: any, nextDueDate: any, comment: any) {
    this.submitted = true;
    this.profile_detail.immunization.splice(this.i, 1) //index, element..
    this.dialogRef.close(this.profile_detail);
    console.log(this.profile_detail)
  }


  closeDialog() {
    this.dialogRef.close(this.profile_detail)
  }

  onNoClick(): void {
    this.dialogRef.close();
    //console.log(this.data)
  }
}

