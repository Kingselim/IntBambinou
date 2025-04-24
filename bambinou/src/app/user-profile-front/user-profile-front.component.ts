import { Component } from '@angular/core';
import { AuthService } from '../backoffice/service/auth.service';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../model/User';
@Component({
  selector: 'app-user-profile-front',
  templateUrl: './user-profile-front.component.html',
  styleUrls: ['./user-profile-front.component.css']
})
export class UserProfileFrontComponent {

  CurrentName! : string
  CurrentUser! : User
  couleur!:string
  constructor(private authService: AuthService,private rt:Router,private userService: UserServiceService) { }

  ngOnInit() {
    this.couleur ="#d63384"
    //const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.authService.getDecodedToken(token);
      this.CurrentName = decodedToken.name;
      this.userService.getUserByEmail(decodedToken.sub).subscribe(data => {
        this.CurrentUser = data
      })
    }
  }


  logout(): void {
    this.authService.logout();
    this.rt.navigateByUrl('/home')
  }
}
