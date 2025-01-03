import { forwardRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DocumentComponent, DialogBoxComponent, ViewComponent, EditComponent, EditAllComponent, DeleteComponent } from './document/document.component';

import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { SafeurlPipe } from './safeurl.pipe';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { ReminderComponent, AddComponent } from './reminder/reminder.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuditComponent } from './audit/audit.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ConnectionsComponent, AddDialogComponent, AddRequestComponent, EditEntityComponent, DeleteEntityComponent, RequestDialogComponent } from './connections/connections.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HealthComponent, CareplanComponent, ViewCareplanComponent, ExerciseDialogComponent, ExerciseEditComponent, ExerciseDeleteComponent, HealthinfoComponent, ProfileinfoComponent } from './health/health.component';
import { HealthdashboardComponent, MedicalDialogComponent, MedicalEditComponent, AllergyDialogComponent, AllergyEditComponent, MedicationsDialogComponent, MedicationsEditComponent, FamilyDialogComponent, FamilyEditComponent, InsuranceDialogComponent, InsuranceEditComponent, ImmunizationDialogComponent, ImmunizationEditComponent } from './healthdashboard/healthdashboard.component';
import { DevicesComponent, AddDeviceComponent, DeleteDialogComponent, } from './devices/devices.component';
import { SinglecardComponent, DeviceAddComponent } from './singlecard/singlecard.component';
import { ThreeCardComponent, DeviceAdd2Component, } from './three-card/three-card.component';
import { BmiComponent } from './bmi/bmi.component';
import { SingledialogcardComponent, DeviceAddedComponent } from './singledialogcard/singledialogcard.component';
import { ThreeDialogCardComponent, DeviceAdded2Component } from './three-dialog-card/three-dialog-card.component';
import { ChatComponent } from './chat/chat.component';
import { ConfirmationDialogComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    TopBarComponent,
    LogoutComponent,
    RegisterComponent,
    HomepageComponent,
    DocumentComponent,
    DialogBoxComponent,
    ViewComponent,
    EditComponent,
    DeleteComponent,
    SafeurlPipe,
    SideBarComponent,
    EditAllComponent,
    SettingsComponent,
    ReminderComponent,
    AddComponent,
    NotificationsComponent,
    AuditComponent,
    ConnectionsComponent,
    AddDialogComponent,
    AddRequestComponent,
    EditEntityComponent,
    DeleteEntityComponent,
    RequestDialogComponent,
    HealthComponent,
    CareplanComponent,
    ViewCareplanComponent,
    ExerciseDialogComponent,
    ExerciseEditComponent,
    ExerciseDeleteComponent,
    HealthdashboardComponent,
    HealthinfoComponent,
    ProfileinfoComponent,
    MedicalDialogComponent,
    AllergyDialogComponent,
    MedicationsDialogComponent,
    FamilyDialogComponent,
    InsuranceDialogComponent,
    ImmunizationDialogComponent,
    MedicalEditComponent,
    AllergyEditComponent,
    MedicationsEditComponent,
    FamilyEditComponent,
    InsuranceEditComponent,
    ImmunizationEditComponent,

    DevicesComponent,
    AddDeviceComponent,
    DeleteDialogComponent,
    SinglecardComponent,
    DeviceAddComponent,
    ThreeCardComponent,
    DeviceAdd2Component,
    BmiComponent,
    SingledialogcardComponent,
    DeviceAddedComponent,
    ThreeDialogCardComponent,
    DeviceAdded2Component,
    ChatComponent,
    ConfirmationDialogComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
<<<<<<< Updated upstream
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-center',
      maxOpened: 4,
      onActivateTick: true,
      preventDuplicates: true
    }),
=======
    // ToastrModule.forRoot({
    //   timeOut: 1000,
    //   positionClass: 'toast-top-right',
    //   maxOpened: 4,
    //   onActivateTick: true,
    //   preventDuplicates: true
    // }),
    ToastrModule.forRoot(),  
>>>>>>> Stashed changes
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    // MatDatepickerModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatCommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatChipsModule,
    //MatAutocompleteModule,
    NoopAnimationsModule,
    MatTooltipModule,
    Ng2SearchPipeModule,


    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'homepage', component: HomepageComponent },
      { path: 'document', component: DocumentComponent },
      { path: 'connections', component: ConnectionsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'reminder', component: ReminderComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'audit', component: AuditComponent },
      { path: 'logout', component: LogoutComponent },

      { path: 'health', component: HealthComponent },
      { path: 'careplan', component: CareplanComponent },
      { path: 'viewcareplan', component: ViewCareplanComponent },
      { path: 'viewcareplan/:id', component: ViewCareplanComponent },
      { path: 'exercise-dialog', component: ExerciseDialogComponent },

      { path: 'profileinfo', component: ProfileinfoComponent },
      { path: 'healthinfo', component: HealthinfoComponent },

      { path: 'healthdashboard', component: HealthdashboardComponent },
      { path: 'medical-dialog', component: MedicalDialogComponent },
      { path: 'chat', component: ChatComponent }


    ])
  ],

  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,

  ],


})
export class AppModule { }
