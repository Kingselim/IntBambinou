import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { UserComponent } from './user/user.component';
import { BackofficeComponent } from './backoffice.component';
import { UserFormComponent } from './user-form/user-form.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BackofficeFooterComponent } from './backoffice-footer/backoffice-footer.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { BackofficeNavbarComponent } from './backoffice-navbar/backoffice-navbar.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RestorePasswordComponent } from './restore-password/restore-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './chat/chat.component';
import { WebcamModule } from 'ngx-webcam';
import { WebcamComponent } from './webcam/webcam.component';
import { FormsModule } from '@angular/forms';
import { MinichatComponent } from './minichat/minichat.component';
import { Forum2Component } from './forum2/forum2.component';
import { PregnancyTracking2Component } from './pregnancy-tracking2/pregnancy-tracking2.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    DashboardComponent,
    UserComponent,
    UserFormComponent,
    SidebarComponent,
    BackofficeFooterComponent,
    UserDetailComponent,
    LoginFormComponent,
    SignupFormComponent,
    BackofficeNavbarComponent,
    ForgotPasswordComponent,
    RestorePasswordComponent,
    UserProfileComponent,
    ChatComponent,
    WebcamComponent,
    MinichatComponent,
    Forum2Component,
    PregnancyTracking2Component
    
   
    
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    ReactiveFormsModule,
    WebcamModule,
    FormsModule

    
    
  ],
  exports: [MinichatComponent] // 👈 IMPORTANT : exporter le composant

})
export class BackofficeModule { }
