import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './backoffice/service/auth.service';  // Ton service d'authentification

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Vérifier si l'utilisateur est authentifié
    //const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    if (token && this.authService.isAuthenticated() && this.authService.isTokenExpored()==false) {
      if(this.authService.isTokenExpored()){
        console.log('token expiré donc a ete retirer de localstorage car expirer');
      }
      console.log('Utilisateur authentifié');
      // L'utilisateur est authentifié, lui permettre l'accès
      return true;
    } else {
      console.log('Utilisateur non authentifié');
      // L'utilisateur n'est pas authentifié, rediriger vers la page de login
      this.router.navigate(['/backoffice/login']);
      return false;
    }
  }
}
