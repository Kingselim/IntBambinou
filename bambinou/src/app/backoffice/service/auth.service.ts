import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8089/auth/'; // Remplace par ton URL backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.apiUrl+'login', { email, password });
  }

  logout(): void {
    //localStorage.removeItem('token'); // Supprime le token en cas de déconnexion
    sessionStorage.removeItem('token');
  }

  saveToken(token: string): void {
    //localStorage.setItem('token', token); // Stocke le token dans localStorage
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    //return localStorage.getItem('token'); // Récupère le token stocké
    return sessionStorage.getItem('token')
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Vérifie si l'utilisateur est connecté
  }

   // Méthode pour récupérer les données du token
   getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);  // Décoder le token et retourner le contenu
    } catch (error) {
      console.error('Erreur lors du décodage du token', error);
      return null;
    }
  }

  // Exemple d'utilisation de la méthode
  getUserInfo() {
    //const token = localStorage.getItem('token');  // Récupérer le token stocké (ou de l'endroit où tu le stockes)
    const token = sessionStorage.getItem('token'); 
    if (token) {
      const decodedToken = this.getDecodedToken(token);
      console.log(decodedToken); // Afficher ou utiliser les données du token
      return decodedToken;
    }
  }
  isAuthenticated(): boolean {
    //const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    return !!token;  // Retourne true si le token est présent, sinon false
  }

  isTokenExpored(): boolean {
    //const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.getDecodedToken(token);
      if (decodedToken && decodedToken.exp) {
        const expirationDate = new Date(decodedToken.exp * 1000);  // Convertir en millisecondes
        console.log('DATE OF CREATION    of token:', decodedToken.iat);
        console.log('Expiration date of token:', expirationDate);
        return expirationDate < new Date();  // Vérifier si la date d'expiration est avant aujourd'hui
      }
    }
    return false;  // Si le token n'est pas trouvé ou n'a pas de date d'expiration, considérer comme non expiré
  }

  restorePassword(email: string, password: string): Observable<any> {
    console.log("restorePassword is called in auth.service.ts", email, password);
    return this.http.post(this.apiUrl+'restorepassword',{ email, password});
  }

  forgotPassword(email: string): Observable<any> {
    console.log("forgotPassword is called in auth.service.ts", email);
    return this.http.post(this.apiUrl+'forgotpassword',{ email});
  }
 


}
