import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { PregnancyTrackingComponent } from './pregnancy-tracking/pregnancy-tracking.component';
import { BackofficeModule } from './backoffice/backoffice.module';
import { BabySittingComponent } from './baby-sitting/baby-sitting.component';
import { AlimentationComponent } from './alimentation/alimentation.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { ShopComponent } from './shop/shop.component';
import { CoachingComponent } from './coaching/coaching.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ForgotPasswordComponent } from './backoffice/forgot-password/forgot-password.component';
import { UserProfileFrontComponent } from './user-profile-front/user-profile-front.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MonthlyTrackingComponent } from './monthly-tracking/monthly-tracking.component';
import { PregnancyJournalComponent } from './pregnancy-journal/pregnancy-journal.component';
import { PregnancyJournalSectionComponent } from './pregnancy-journal-section/pregnancy-journal-section.component';
import { SemesterTrackingComponent } from './semester-tracking/semester-tracking.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { ChatbotMedicalComponent } from './chatbot-medical/chatbot-medical.component';
import { NgChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './post/post.component';
import { NutritionAiComponent } from './nutrition-ai/nutrition-ai.component';
import { ViewpostsComponent } from './viewposts/viewposts.component';

// Angular Material Modules
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    PregnancyTrackingComponent,
    BabySittingComponent,
    AlimentationComponent,
    AppointmentComponent,
    ShopComponent,
    CoachingComponent,
    UserProfileFrontComponent,
    MonthlyTrackingComponent,
    PregnancyJournalComponent,
    PregnancyJournalSectionComponent,
    SemesterTrackingComponent,
    TodoListComponent,
    ChatbotMedicalComponent,
    PostComponent,
    NutritionAiComponent,
    ViewpostsComponent
    
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BackofficeModule,
    MatSnackBarModule,
    NgChartsModule,
    RouterModule,
    BrowserAnimationsModule,
    
    // Angular Material Modules
    MatProgressSpinnerModule, // For <mat-spinner>
    MatTableModule,          // For <mat-table>
    MatIconModule,           // For <mat-icon>
    MatButtonModule,         // For <button mat-button>
    MatCardModule,           // For <mat-card>
    MatToolbarModule,        // For <mat-toolbar>
    MatInputModule,          // For <mat-input>
    MatFormFieldModule,      // For <mat-form-field>
    MatSnackBarModule        // For notifications

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }  // Ajouter l'intercepteur ici
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
