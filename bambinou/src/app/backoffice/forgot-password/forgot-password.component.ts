import { Component } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/User';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotform: FormGroup;
  User!: User;
  

  constructor(private authService: AuthService, private router: Router, private userService: UserServiceService, private Ac: ActivatedRoute) {
    this.forgotform = new FormGroup({
      email: new FormControl('', [Validators.required])// controle de saisie
    });
  }

  ngOnInit(): void {
    
  }

  forgotPassword(): void {
    console.log("forgotPassword is called");
    this.authService.forgotPassword(this.forgotform.value.email).subscribe(
      (response) => {
        console.log('forgotPassword successfully', response);
        this.router.navigate(['/backoffice/login']);
      },
      (error) => {
        console.error('Error forgotpassword', error);
      }
    )
  }
}
