import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';



import { DashboardComponent } from './component/admin/dashboard/dashboard.component';
import { WorkersComponent } from './component/admin/workers/workers.component';
import { WorkersProfilComponent } from './component/admin/workers/workers-profil/workers-profil.component';
import { WorkersEditComponent } from './component/admin/workers/workers-edit/workers-edit.component';

import { WorkersAddComponent } from './component/admin/workers/workers-add/workers-add.component';
import { TeamsAddComponent } from './component/admin/teams/teams-add/teams-add.component';
import { TeamsEditComponent } from './component/admin/teams/teams-edit/teams-edit.component';
import {RouterModule} from "@angular/router";
import {TeamsComponent} from "./component/admin/teams/teams.component";
import { TeamsProfileComponent } from './component/admin/teams-profile/teams-profile.component';
import { CriteriasComponent } from './component/admin/criterias/criterias.component';
import { CriteriasAddComponent } from './component/admin/criterias/criterias-add/criterias-add.component';
import { CriteriasEditComponent } from './component/admin/criterias/criterias-edit/criterias-edit.component';
import { EnvComponent } from './component/admin/env/env.component';
import { EnvAddComponent } from './component/admin/env/env-add/env-add.component';
import { EnvEditComponent } from './component/admin/env/env-edit/env-edit.component';
import { EnvProfileComponent } from './component/admin/env/env-profile/env-profile.component';
import { DataComponent } from './component/admin/data/data.component';
import { DataAddComponent } from './component/admin/data/data-add/data-add.component';
import { DataEditComponent } from './component/admin/data/data-edit/data-edit.component';
import { DataCheckComponent } from './component/admin/data/data-check/data-check.component';
import { ChecksComponent } from './component/admin/checks/checks.component';
import { ChecksAddComponent } from './component/admin/checks/checks-add/checks-add.component';
import { ChecksEditComponent } from './component/admin/checks/checks-edit/checks-edit.component';
import {ExcelUploadComponent} from "./component/admin/data/data-add/excel-upload/excel-upload.component";
import {AngularFireModule} from "@angular/fire/compat";
import { UserManagementComponent } from './component/admin/user-management/user-management.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { HttpClientModule } from "@angular/common/http";

import {MasterDetailssComponent} from "./component/admin/checks/master-details/master-details.component";
import { FillMasterDetailsComponent } from './component/admin/checks/master-details/fill-master-details/fill-master-details/fill-master-details.component';
import { FillAllMasterDetailsComponent } from './component/admin/checks/master-details/fill-all-master-details/fill-all-master-details/fill-all-master-details.component';
import { FullcalendarComponent } from './component/admin/dashboard/fullcalendar/fullcalendar.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import { UserEditComponent } from './component/admin/user-management/user-edit/user-edit.component';
import { ForgotPasswordComponent } from './login/reset-password/forgot-password.component';
import {NotifierModule, NotifierService} from "angular-notifier";
import {NgToastModule} from "ng-angular-popup";
import { ConfirmEmailComponent } from './login/confirm-email/confirm-email.component';
import { ChangePasswordComponent } from './login/change-password/change-password.component';
import {AlertModule, AlertService} from "ngx-alerts";
FullCalendarModule.registerPlugins([interactionPlugin, dayGridPlugin]);


@NgModule({
  declarations: [
    MasterDetailssComponent,
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    TeamsComponent,
    DashboardComponent,
    WorkersComponent,
    WorkersProfilComponent,
    WorkersEditComponent,
    WorkersAddComponent,
    TeamsAddComponent,
    TeamsEditComponent,
    TeamsProfileComponent,
    CriteriasComponent,
    CriteriasAddComponent,
    CriteriasEditComponent,
    EnvComponent,
    EnvAddComponent,
    EnvEditComponent,
    EnvProfileComponent,
    DataComponent,
    DataAddComponent,
    DataEditComponent,
    DataCheckComponent,
    ChecksComponent,
    ChecksAddComponent,
    ChecksEditComponent,
    ExcelUploadComponent,
    UserManagementComponent,
    FillMasterDetailsComponent,
    FillAllMasterDetailsComponent,
    FullcalendarComponent,
    UserEditComponent,
    ForgotPasswordComponent,
    ConfirmEmailComponent,
    ChangePasswordComponent,


  ],
  imports: [

    NotifierModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyC4-yDG6MNn6oWK0x0BBpp1zyqUkfXXF-Q",
      authDomain: "pfe-project-cef56.firebaseapp.com",
      projectId: "pfe-project-cef56",
      storageBucket: "pfe-project-cef56.appspot.com",
      messagingSenderId: "602297702161",
      appId: "1:602297702161:web:8f92c0aab8afd887ca5eb0"
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot([{path: '', component: LoginComponent, pathMatch: 'full'},
      {path: 'workers', component: WorkersComponent},],),
    GridModule,
    FullCalendarModule,
    NgToastModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
