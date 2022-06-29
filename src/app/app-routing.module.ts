import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {DashboardComponent} from "./component/admin/dashboard/dashboard.component";
import {TeamsComponent} from "./component/admin/teams/teams.component";
import {TeamsAddComponent} from "./component/admin/teams/teams-add/teams-add.component";
import {TeamsEditComponent} from "./component/admin/teams/teams-edit/teams-edit.component";
import {TeamsProfileComponent} from "./component/admin/teams-profile/teams-profile.component";
import {CriteriasComponent} from "./component/admin/criterias/criterias.component";
import {CriteriasAddComponent} from "./component/admin/criterias/criterias-add/criterias-add.component";
import {CriteriasEditComponent} from "./component/admin/criterias/criterias-edit/criterias-edit.component";
import {EnvComponent} from "./component/admin/env/env.component";
import {EnvProfileComponent} from "./component/admin/env/env-profile/env-profile.component";
import {EnvAddComponent} from "./component/admin/env/env-add/env-add.component";
import {EnvEditComponent} from "./component/admin/env/env-edit/env-edit.component";
import {DataComponent} from "./component/admin/data/data.component";
import {DataAddComponent} from "./component/admin/data/data-add/data-add.component";
import {DataEditComponent} from "./component/admin/data/data-edit/data-edit.component";
import {ChecksComponent} from "./component/admin/checks/checks.component";
import {ChecksAddComponent} from "./component/admin/checks/checks-add/checks-add.component";
import {ChecksEditComponent} from "./component/admin/checks/checks-edit/checks-edit.component";
import {ExcelUploadComponent} from "./component/admin/data/data-add/excel-upload/excel-upload.component";
import {AuthGuard} from "./guards/auth.guard";
import {UserManagementComponent} from "./component/admin/user-management/user-management.component";
import {NormalAuthService} from "./guards/normal-auth.service";
import {MasterDetailssComponent} from "./component/admin/checks/master-details/master-details.component";
import {DataCheckComponent} from "./component/admin/data/data-check/data-check.component";
import {
  FillMasterDetailsComponent
} from "./component/admin/checks/master-details/fill-master-details/fill-master-details/fill-master-details.component";
import {
  FillAllMasterDetailsComponent
} from "./component/admin/checks/master-details/fill-all-master-details/fill-all-master-details/fill-all-master-details.component";
import {FullcalendarComponent} from "./component/admin/dashboard/fullcalendar/fullcalendar.component";
import {ConfirmEmailComponent} from "./login/confirm-email/confirm-email.component";
import {ForgotPasswordComponent} from "./login/reset-password/forgot-password.component";
import {ChangePasswordComponent} from "./login/change-password/change-password.component";
import {UserEditComponent} from "./component/admin/user-management/user-edit/user-edit.component";

export const routes: Routes = [
  {
    path: 'Login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'confirmEmail',
    pathMatch: 'full',
    component: ConfirmEmailComponent,
  },
  {
    path: 'ResetPassword',
    pathMatch: 'full',
    component: ForgotPasswordComponent,
  },
  {
    path: 'ChangePassword',
    pathMatch: 'full',
    component: ChangePasswordComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegistrationComponent,
  },
  {
    path: 'fullcalendar',
    pathMatch: 'full',
    component: FullcalendarComponent,
  },
  {
    path: 'teams',children:[
      { path:'list', component: TeamsComponent,canActivate:[NormalAuthService]},
      { path: ':id/profile', component: TeamsProfileComponent,canActivate:[NormalAuthService]},
      { path: 'add', component: TeamsAddComponent ,canActivate:[NormalAuthService]},
      { path: ':id/edit', component: TeamsEditComponent,canActivate:[NormalAuthService] },
    ]
  },
  {
    path: 'users',children:[
      { path:'list', component: UserManagementComponent,canActivate:[NormalAuthService]},
      { path: ':id/edit', component: UserEditComponent,canActivate:[NormalAuthService] },
    ]
  },

  {
    path: 'criterias',children:[
      { path:'list', component: CriteriasComponent,canActivate:[NormalAuthService]},
      { path: 'add', component: CriteriasAddComponent,canActivate:[NormalAuthService] },
      { path: ':id/edit', component: CriteriasEditComponent,canActivate:[NormalAuthService] },
    ]
  },
  {
    path: 'envs',children:[
      { path:'list', component: EnvComponent,canActivate:[NormalAuthService]},
      { path: ':id/profile', component: EnvProfileComponent,canActivate:[NormalAuthService] },
      { path: 'add', component: EnvAddComponent,canActivate:[NormalAuthService] },
      { path: ':id/edit', component: EnvEditComponent ,canActivate:[NormalAuthService]},
    ],
  },
  {
    path: 'data',children:[
      { path:'list', component: DataComponent,canActivate:[AuthGuard]},
      { path: ':id/check', component: DataCheckComponent,canActivate:[AuthGuard] },
      { path: 'add', component: DataAddComponent,canActivate:[AuthGuard]},
      { path: 'add/excel', component: ExcelUploadComponent,canActivate:[AuthGuard]},
      { path: ':id/edit', component: DataEditComponent,canActivate:[AuthGuard] },
    ],
  },
  {
    path: 'checks',children:[
      { path: 'add', component: ChecksAddComponent ,canActivate:[NormalAuthService]},
      { path: ':id/edit', component: ChecksEditComponent ,canActivate:[NormalAuthService]},
      { path: 'list', component: MasterDetailssComponent ,canActivate:[NormalAuthService]},
      { path: 'list/:id/fill', component: FillMasterDetailsComponent ,canActivate:[NormalAuthService]},
      { path: 'list/:id/fill-all', component: FillAllMasterDetailsComponent ,canActivate:[NormalAuthService]},
    ]
  },
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent
  },
  {
    path: '**',
    redirectTo: '/Login'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
