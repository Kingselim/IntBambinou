import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import {HomeComponent} from './home/home.component';
import {PregnancyTrackingComponent} from './pregnancy-tracking/pregnancy-tracking.component';
import {BabySittingComponent} from './baby-sitting/baby-sitting.component';
import {AlimentationComponent} from './alimentation/alimentation.component';
import {AppointmentComponent} from './appointment/appointment.component';
import {ShopComponent} from './shop/shop.component';
import { CoachingComponent } from './coaching/coaching.component';
import('./backoffice/backoffice.module')
import {UserProfileFrontComponent} from './user-profile-front/user-profile-front.component';
import { AuthGuard } from './auth.guard';
import { MonthlyTrackingComponent } from './monthly-tracking/monthly-tracking.component';
import { SemesterTrackingComponent } from './semester-tracking/semester-tracking.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { PregnancyJournalComponent } from './pregnancy-journal/pregnancy-journal.component';
import { PregnancyJournalSectionComponent } from './pregnancy-journal-section/pregnancy-journal-section.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirection au chargement
  {path: 'about', component: AboutComponent},
  { path: 'home', component: HomeComponent },
  { path: 'PregnancyTracking', component: PregnancyTrackingComponent ,canActivate: [AuthGuard]},
  { path: 'backoffice', loadChildren: () => import('./backoffice/backoffice.module').then(m => m.BackofficeModule) },
  { path: 'BabySitting', component:BabySittingComponent },
  {path: 'Alimentation', component:AlimentationComponent},
  {path: 'Appointment' , component:AppointmentComponent},
  {path: 'Shop' , component:ShopComponent},
  {path :'Coaching' , component:CoachingComponent},
  {path:'userProfile/:id' , component:UserProfileFrontComponent,canActivate: [AuthGuard]},
  { path: 'monthly-tracking/:id', component: MonthlyTrackingComponent },
  {path:'semester-tracking/:id', component : SemesterTrackingComponent},
  { path: 'todo-list/:id', component: TodoListComponent },
  {path:'journal/:id' ,component: PregnancyJournalComponent},
  { path: 'journal-section/:id', component: PregnancyJournalSectionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
