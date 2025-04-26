import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeComponent } from './backoffice.component';
import { UserComponent } from './user/user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent} from './signup-form/signup-form.component'
import { AuthGuard } from '../auth.guard';  // Import du guard
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { User } from '../model/User';
import {UserProfileComponent} from './user-profile/user-profile.component'
import { ChatComponent } from './chat/chat.component';
import { WebcamComponent } from './webcam/webcam.component';
import {MinichatComponent} from './minichat/minichat.component'
import { Forum2Component } from './forum2/forum2.component';
import { PregnancyTracking2Component } from './pregnancy-tracking2/pregnancy-tracking2.component';
import { PostsBComponent } from './posts-b/posts-b.component';
import { AlimentationBComponent } from './alimentation-b/alimentation-b.component';
const routes: Routes = [
 // { path: 'dashboard', component: DashboardComponent },

  { path: '', component: BackofficeComponent, children: [
    { path: 'dashboard', component: DashboardComponent ,canActivate: [AuthGuard] },
    {path: 'user', component: UserComponent ,canActivate: [AuthGuard]},
    {path: 'user/add',component:  UserFormComponent,canActivate: [AuthGuard]},
    {path: 'user/add/:id',component:  UserFormComponent,canActivate: [AuthGuard]},
    {path: 'user/detail/:id',component:  UserDetailComponent,canActivate: [AuthGuard]},
    {path: 'login', component: LoginFormComponent},
    {path: 'signup', component: SignupFormComponent},
    {path: 'forgotpassword', component: ForgotPasswordComponent},
    {path: 'restorepassword/:id', component: RestorePasswordComponent},
    {path:'user/profile/:id', component: UserProfileComponent,canActivate: [AuthGuard]},
    {path: 'user/chat', component: ChatComponent,canActivate: [AuthGuard]},
    { path: 'webcam', component: WebcamComponent }, // ⬅️ Route vers ta page webcam
    { path: 'webcam/:id', component: WebcamComponent,canActivate: [AuthGuard] }, // ⬅️ Route vers ta page webcam
    { path: 'minichat', component: MinichatComponent},
    {path: 'pregnancy-tracking2', component: PregnancyTracking2Component},
    {path:'forum2', component: Forum2Component},
    {path: 'poste' ,component:PostsBComponent},
    { path: 'alimentation', component: AlimentationBComponent }
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
  ] 
}

  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
