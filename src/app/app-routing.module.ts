import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HomepageComponent } from './homepage/homepage.component';
import { DocumentComponent } from './document/document.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { ReminderComponent } from './reminder/reminder.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AuditComponent } from './audit/audit.component';
import { LogoutComponent } from './logout/logout.component';
import { ConnectionsComponent } from './connections/connections.component';
import { HealthComponent, CareplanComponent, ViewCareplanComponent, ExerciseDialogComponent, ExerciseEditComponent, ExerciseDeleteComponent, HealthinfoComponent, ProfileinfoComponent } from './health/health.component';
import { HealthdashboardComponent, MedicalDialogComponent, MedicalEditComponent, AllergyDialogComponent, AllergyEditComponent, MedicationsDialogComponent, MedicationsEditComponent, FamilyDialogComponent, FamilyEditComponent, InsuranceDialogComponent, InsuranceEditComponent, ImmunizationDialogComponent, ImmunizationEditComponent } from './healthdashboard/healthdashboard.component';
import { DevicesComponent, AddDeviceComponent, DeleteDialogComponent, } from './devices/devices.component';
import { SinglecardComponent, DeviceAddComponent } from './singlecard/singlecard.component';
import { ThreeCardComponent, DeviceAdd2Component, } from './three-card/three-card.component';
import { BmiComponent } from './bmi/bmi.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'document', component: DocumentComponent },
  { path: 'connections', component: ConnectionsComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'side-bar', component: SideBarComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'reminder', component: ReminderComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'audit', component: AuditComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'health', component: HealthComponent },
  { path: 'careplan', component: CareplanComponent },
  //{ path: 'viewcareplan', component: ViewCareplanComponent },
  { path: 'viewcareplan/:id', component: ViewCareplanComponent },
  { path: 'exercise-dialog', component: ExerciseDialogComponent },
  { path: 'profileinfo', component: ProfileinfoComponent },
  { path: 'healthinfo', component: HealthinfoComponent },
  { path: 'healthdashboard', component: HealthdashboardComponent },
  { path: 'devices', component: DevicesComponent },
  { path: 'add-device', component: AddDeviceComponent },
  { path: 'bmi', component: BmiComponent },
  { path: 'singlecard', component: SinglecardComponent },
  { path: 'three-card', component: ThreeCardComponent },
  { path: 'chat', component: ChatComponent }

  //{ path: '',   redirectTo: '/login', pathMatch: 'full' }  //redirect to login page.
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),

  ToastrModule.forRoot({
    timeOut: 1000,
    positionClass: 'toast-bottom-center',
    maxOpened: 4,
    onActivateTick: true,
    preventDuplicates: true
  })],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})

export class AppRoutingModule { }
