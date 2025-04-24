import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/User';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css',"../../../assets/BackOffice/assets/css/bootstrap.min.css",
    "../../../assets/BackOffice/assets/css/demo.css",
    "../../../assets/BackOffice/assets/css/fonts.css",
    "../../../assets/BackOffice/assets/css/fonts.min.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class UserProfileComponent {
 CurrentEmail! : string;
  CurrentName! : string;
CurrentUser! : User;
couleur!:string
fontcouleur!:string
  constructor(private authService: AuthService,private rt:Router,private userService: UserServiceService) { }
  ngOnInit() {
    //const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.authService.getDecodedToken(token);
      if(decodedToken.role[0].role=='ADMIN'){
        this.couleur="#2a2f5b";
        this.fontcouleur="white";
        console.log("couleur dans if admin",this.couleur);
      }
      if(decodedToken.role[0].role=="PATIENT"){
        this.couleur="#d63384";
        this.fontcouleur="white";
        console.log("couleur dans if patient user-profile",this.couleur);
      }
      if (decodedToken) {
        this.CurrentEmail = decodedToken.sub;
        this.CurrentName = decodedToken.name;
       
        console.log(this.CurrentEmail);
        this.userService.getUserByEmail(this.CurrentEmail).subscribe(data => {
          this.CurrentUser = data
          console.log('User Data:', this.CurrentUser.email);
          console.log('Roles:', this.CurrentUser.roleTypes);
          console.log('Type de roleTypes:', typeof this.CurrentUser.roleTypes);
      
        })
      }
    }
  }
}
