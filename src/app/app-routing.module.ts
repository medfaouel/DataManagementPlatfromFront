import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {DashboardComponent} from "./component/admin/dashboard/dashboard.component";
import {WorkersComponent} from "./component/admin/workers/workers.component";
import {WorkersEditComponent} from "./component/admin/workers/workers-edit/workers-edit.component";
import {WorkersProfilComponent} from "./component/admin/workers/workers-profil/workers-profil.component";
import {WorkersAddComponent} from "./component/admin/workers/workers-add/workers-add.component";
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

export const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'register',
    pathMatch: 'full',
    component: RegistrationComponent,
  },
  {
    path: 'workers',children:[
      { path:'list', component: WorkersComponent,canActivate:[AuthGuard]},
      { path: ':id/profile', component: WorkersProfilComponent,canActivate:[AuthGuard] },
      { path: 'add', component: WorkersAddComponent ,canActivate:[AuthGuard]},
      { path: ':id/edit', component: WorkersEditComponent ,canActivate:[AuthGuard]},
    ]
  },
  {
    path: 'teams',children:[
      { path:'list', component: TeamsComponent,canActivate:[AuthGuard]},
      { path: ':id/profile', component: TeamsProfileComponent,canActivate:[AuthGuard]},
      { path: 'add', component: TeamsAddComponent ,canActivate:[AuthGuard]},
      { path: ':id/edit', component: TeamsEditComponent,canActivate:[AuthGuard] },
    ]
  },
  {
    path: 'users',children:[
      { path:'list', component: UserManagementComponent,canActivate:[NormalAuthService]},
    ]
  },

  {
    path: 'criterias',children:[
      { path:'list', component: CriteriasComponent,canActivate:[AuthGuard]},
      //{ path: ':id/profile', component: Criter},
      { path: 'add', component: CriteriasAddComponent,canActivate:[AuthGuard] },
      { path: ':id/edit', component: CriteriasEditComponent,canActivate:[AuthGuard] },
    ]
  },
  {
    path: 'envs',children:[
      { path:'list', component: EnvComponent,canActivate:[AuthGuard]},
      { path: ':id/profile', component: EnvProfileComponent,canActivate:[AuthGuard] },
      { path: 'add', component: EnvAddComponent,canActivate:[AuthGuard] },
      { path: ':id/edit', component: EnvEditComponent ,canActivate:[AuthGuard]},
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
      { path:'list', component: ChecksComponent,canActivate:[AuthGuard]},
      //{ path: ':id/profile', component: EnvProfileComponent },
      { path: 'add', component: ChecksAddComponent ,canActivate:[AuthGuard]},
      { path: ':id/edit', component: ChecksEditComponent ,canActivate:[AuthGuard]},
      { path: 'test', component: MasterDetailssComponent ,canActivate:[AuthGuard]},
      { path: 'test/:id/fill', component: FillMasterDetailsComponent ,canActivate:[AuthGuard]},
    ]
  },

  /*{
    path: 'workers/edit',
    pathMatch: 'full',
    component: WorkersEditComponent,
  },
  {
    path: 'workers/edit/:id',
    pathMatch: 'full',
    component: WorkersEditComponent,
  },
  {
    path: 'workers/add',
    pathMatch: 'full',
    component: WorkersAddComponent,
  },
  {
    path: 'workers-profil',
    pathMatch: 'full',
    component: WorkersProfilComponent,
  },
  {
    path: 'workers/profil/:id',
    pathMatch: 'full',
    component: WorkersProfilComponent,
  },*/
  {
    path: 'dashboard',
    pathMatch: 'full',
    component: DashboardComponent,
  },
  /*{
    path: 'interface',
    loadChildren: () => import('./interface').then(m => m.InterfaceComponent),
    canActivate:[AdminAuthorization]
  },*/
  {
    path: '**',
    redirectTo: '/inteface'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
