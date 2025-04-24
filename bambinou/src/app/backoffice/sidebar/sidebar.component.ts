import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css',"../../../assets/BackOffice/assets/css/bootstrap.min.css",
    "../../../assets/BackOffice/assets/css/demo.css",
    "../../../assets/BackOffice/assets/css/fonts.css",
    "../../../assets/BackOffice/assets/css/fonts.min.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.css",
    "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class SidebarComponent implements OnInit {
  couleur!:string
  fontcouleur!:string
  role!:string
 constructor(private authService: AuthService){}

 ngOnInit(): void {
  const decodedToken= this.authService.getUserInfo(); // recuperer les infos du user a partir du toke
  console.log("le decodeedtoken dans sidebar :",decodedToken);

  console.log("role dans sidebar",decodedToken.role[0].role);
  if(decodedToken.role[0].role=='ADMIN'){
    this.couleur="";
    this.role="ADMIN";

    console.log("couleur dans if admin",this.couleur);
  }
  else{
    this.couleur="#d63384";
    this.fontcouleur="white";
    this.role="PATIENT";
    console.log("couleur dans if patient",this.couleur);

  }
  console.log("couleur dans sidebar",this.couleur);
 }
}
