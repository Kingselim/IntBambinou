import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-backoffice-navbar',
  templateUrl: './backoffice-navbar.component.html',
  styleUrls: ['./backoffice-navbar.component.css',"../../../assets/BackOffice/assets/css/bootstrap.min.css",
    "../../../assets/BackOffice/assets/css/demo.css",
    "../../../assets/BackOffice/assets/css/fonts.css",
    "../../../assets/BackOffice/assets/css/fonts.min.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class BackofficeNavbarComponent {

  CurrentEmail! : string;
  CurrentName! : string;
  User! : User;
  id! : number;
  constructor(private authService: AuthService,private rt:Router,private userService: UserServiceService, private Ac: ActivatedRoute) { }
  ngOnInit() {
   
    
    //const token = localStorage.getItem(
    // 'token');
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.authService.getDecodedToken(token);
      if (decodedToken) {
        this.CurrentEmail = decodedToken.sub;
        this.CurrentName = decodedToken.name;
        console.log(this.CurrentEmail);
      }
    }
    this.userService.getUserByEmail(this.CurrentEmail).subscribe(data => {
      this.User = data
    })
    console.log('User email:', this.User.email);
  }

  logout(): void {
    this.authService.logout();
    this.rt.navigateByUrl('/home')
  }
}
