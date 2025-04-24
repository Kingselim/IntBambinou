import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/User';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent {

  restoreform: FormGroup;
  User!: User;
  id!: number;

  constructor(private authService: AuthService, private router: Router, private userService: UserServiceService, private Ac: ActivatedRoute) {
    this.restoreform = new FormGroup({
      password: new FormControl('', [Validators.required])// controle de saisie
    });
  }

  ngOnInit(): void {
    this.id = this.Ac.snapshot.params['id']
    this.userService.getUserById(this.id).subscribe(data => {
      this.User = data
    })
  }

  restorePassword(): void {
    console.log("restorePassword is called");
    this.User.password = this.restoreform.value.password;
    this.authService.restorePassword(this.User.email, this.User.password).subscribe(
      (response) => {
        console.log('Password restored successfully', response);
        this.router.navigate(['/backoffice/login']);
      },
      (error) => {
        console.error('Error restoring password', error);
      }
    )
  }
}
