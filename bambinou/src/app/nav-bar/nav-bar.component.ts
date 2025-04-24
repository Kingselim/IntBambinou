import { Component } from '@angular/core';
import { AuthService } from '../backoffice/service/auth.service';  // Ton service d'authentification
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
constructor(private authService: AuthService,private Ac :ActivatedRoute,private router: Router) {}

logout(): void {
  this.authService.logout();
}

userRose(): void {
  console.log("useRose is called");
  if(sessionStorage.getItem('token')!==null){
    const decodedToken = this.authService.getUserInfo();
    if(decodedToken.role[0].role=='ADMIN'){
      this.router.navigate(['/backoffice/dashboard']);
    }
    if(decodedToken.role[0].role=='PATIENT'){
      this.router.navigate(['userProfile/'+decodedToken.id]);
    }
  
  }else{
    this.router.navigate(['/backoffice/login']);
  }
  

}

ngOnInit(): void {
 
}
}
