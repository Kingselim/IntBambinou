import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Import Router
import { PregnancyTrackingService } from 'src/app/service/pregnancy-tracking.service';
import { PregnancyTrackings } from '../model/PregnancyTracking';
import { MatSnackBar } from '@angular/material/snack-bar';


import { AuthService } from '../backoffice/service/auth.service';
import {User} from "../model/User";
import { UserServiceService } from '../service/user-service.service';


@Component({
  selector: 'app-pregnancy-tracking',
  templateUrl: './pregnancy-tracking.component.html',
  styleUrls: ['./pregnancy-tracking.component.css']
})
export class PregnancyTrackingComponent implements OnInit {
  pregnancyForm!: FormGroup;
  pregnancytracking!: PregnancyTrackings;

  constructor(
    private fb: FormBuilder,
    private trackingService: PregnancyTrackingService,
    private router: Router ,
    private snackBar: MatSnackBar,
    private UserService: UserServiceService, private authService: AuthService

     // Inject Router
  ) {}
  User! : User;
  CurrentEmail! : string;
  ngOnInit() {
    console.log("dans peregnancy tracking -----------");
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.authService.getDecodedToken(token);
      if (decodedToken) {
        this.CurrentEmail = decodedToken.sub;
        this.UserService.getUserByEmail(this.CurrentEmail).subscribe(data => {
          this.User = data
          console.log('User ID:::::::::::', this.User.id);
        })
      }
    }else
    {
        console.log("pas de token");
    }


    this.pregnancyForm = this.fb.group({
      namePregnancyTracking: ['', Validators.required],
      datePregnancyTracking: ['', Validators.required],
      intervalChoice: ['', Validators.required],
      id:['']
    });
  }

  onSubmit() {

    if (this.pregnancyForm.valid) {
      console.log("id userrrrrrrrrrrrrr"+this.User.id);

     /* this.pregnancytracking = {...this.pregnancyForm.value,
        id: this.User.id};*/if (this.User && this.User.id) {
  this.pregnancytracking = {
    ...this.pregnancyForm.value,
    user: { id: this.User.id }  // <- structure correcte attendue par le backend
  };
} else {
  console.error('User non défini, impossible d’attacher à pregnancytracking');
}

      this.trackingService.addPregnancyTracking(this.pregnancytracking).subscribe({
        next: (response) => {
          console.log('Success:', response);
          this.snackBar.open('Pregnancy tracking successfully saved!', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
                    // Navigate based on the interval choice
          switch (this.pregnancyForm.value.intervalChoice) {
            case 'MONTH':
              this.router.navigate([ '/monthly-tracking', response.idPregnancyTracking]); // Navigate to form1 if the choice is MONTH
              break;
            case 'SEMESTER':
              this.router.navigate(['/semester-tracking', response.idPregnancyTracking]); // Navigate to form2 if the choice is SEMESTER
              break;
            default:
              console.log('No valid choice was made.');
          }
        },
        error: (error) => {
          console.error('Error:', error);
          this.snackBar.open('Error while saving tracking!', 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
                  }
      });
    }
  }
}
