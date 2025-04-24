import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AfterViewInit,OnInit } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';

declare const grecaptcha: any;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, AfterViewInit{
  email = '';
  password = '';
  errorMessage: string = '';

  loginform: FormGroup;
  decodedToken! : object;  
  //API_KEY! : string;
  API_KEY = '6LehzhMrAAAAADxRyVo1MeCuU-V90P5TYYV2VDxj';
  resultatCaptcha! : string;


  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {
    this.loginform = new FormGroup({

      email: new FormControl('', [Validators.required]),// controle de saisie
      password: new FormControl('', [Validators.required]),
      remember: new FormControl('')
    });
  }
  ngAfterViewInit(): void {
    const renderCaptcha = () => {
      if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
        grecaptcha.render('recaptcha-container', {
          sitekey: this.API_KEY
        });
      } else {
        // Si grecaptcha n'est pas encore prêt, on réessaie dans 500ms
        setTimeout(renderCaptcha, 500);
      }
    };
  
    renderCaptcha(); // Appelle la fonction récursive
  }
  
  


  login(): void {
    this.errorMessage = ''; // Réinitialiser l'erreur avant chaque tentative
   this.recaptcha();
   console.log('voici le resultat du captcha dans login'+this.resultatCaptcha);
    if(this.resultatCaptcha ){

    
      if(this.loginform.value.remember==true){
        console.log('je suis dans le if de remember me');

        localStorage.setItem('email', this.loginform.value.email);
        localStorage.setItem('password', this.loginform.value.password);
        console.log('voici l email'+localStorage.getItem('email'));
        console.log('voici le password'+localStorage.getItem('password'));
      }
        this.authService.login(this.loginform.value.email, this.loginform.value.password).subscribe({
          next: (response) => {
            if (response.token) {
              this.authService.saveToken(response.token);
              const decodedToken= this.authService.getUserInfo(); // recuperer les infos du user a partir du token
              console.log(decodedToken);

              if (decodedToken.status == 1){ // verification du status du user , si 1 ok si 0 compte bloque
                const userRole = decodedToken?.role?.[0]?.role;
                if(userRole==='ADMIN' ){
                  this.router.navigate(['/backoffice/dashboard']);
                }else{
                  this.router.navigate(['userProfile/'+decodedToken.id]);
                }
               
              }
              if (decodedToken.status == 2){
                this.errorMessage = 'Your account is being analyzed';
              }
              else
              {
                this.errorMessage = 'Your account is blocked';
              }

            }
          },
          error: (error) => {
            if (error.status === 401) {
              this.errorMessage = 'Incorrect email or password.';
            } else {
              this.errorMessage = 'An error has occurred. Please try again.';
            }
          },
          complete: () => {
            console.log('Connexion terminée');
          }
    });
  }else{
    //this.errorMessage = 'Please verify that you are not a robot';
  }
  }

  ngOnInit(): void {
    // Vérifier si le token est expiré si oui deconnecter pour retirer le token du localstorage
    if(this.authService.isTokenExpored()){
      this.authService.logout();
      console.log('token expiré donc a ete retirer de localstorage');
    }
    if(localStorage.getItem('email')!==null && localStorage.getItem('password')!==null){
      this.email = localStorage.getItem('email') || '';
      this.password = localStorage.getItem('password') || '';
      this.loginform.patchValue({
       
        email: this.email,
        password: this.password
       
      })
    }
  }
  

  recaptcha(): void {
    setTimeout(() => {
      const captchaToken = (document.getElementById('g-recaptcha-response') as HTMLInputElement)?.value;
      if (!captchaToken) {
        console.error("Token reCAPTCHA non trouvé");
        return;
      }
  
      const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      const body = new URLSearchParams();
      body.set('token', captchaToken); // correspond bien à @RequestParam("token")
  
      this.http.post('http://localhost:8089/auth/verify-captcha', body.toString(), { headers })
        .subscribe({
          next: res => {console.log('Captcha validé ✅', res)
            this.resultatCaptcha = res.toString();
          } ,
          error: err => console.error('Erreur captcha ❌', err)
        });
    }, );
  }
  

 


}
