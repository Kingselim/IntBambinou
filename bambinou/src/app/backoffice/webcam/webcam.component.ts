import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http'; // ⬅️ ajouter cette ligne

import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { UserServiceService } from 'src/app/service/user-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent {
  webcamImage: WebcamImage | null = null;
  private trigger: Subject<void> = new Subject<void>();
  constructor(private http: HttpClient,private Ac: ActivatedRoute, private userService: UserServiceService, private router: Router,private authService: AuthService) {} // ⬅️ injecte le service ici
  capturedImage: string = ''; // ou undefined si tu veux être plus strict
   matchFound! : boolean;
   message = '';
   messageColor = '';
   id!: number
   user!: User
   email = '';
   password = '';
   errorMessage: string = '';

  get triggerObservable() {
    return this.trigger.asObservable();
  }


  ngOnInit(): void {
    this.id = this.Ac.snapshot.params['id']
    if(this.id != null){
      this.userService.getUserById(this.id).subscribe(data => {
        this.user = data
        console.log('User Data:', this.user.email);
        console.log('Roles:', this.user.roleTypes);
        console.log('Type de roleTypes:', typeof this.user.roleTypes);
  
      })
    }
  }


  takeSnapshot(): void {
    this.trigger.next();
    this.login();
  }
  makeUpload(){
    this.trigger.next();
    this.uploadImage();
  }


  handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.capturedImage = webcamImage.imageAsDataUrl;
    console.log('Image capturée : ', webcamImage.imageAsBase64);
  }
  // photo.component.ts
uploadImage() {
  const base64Data = this.capturedImage.split(',')[1]; // On enlève le préfixe data:image/jpeg;base64,...
  const blob = this.base64ToBlob(base64Data, 'image/jpeg');
  const formData = new FormData();
  formData.append('file1', blob, 'photo.jpg');
  console.log("dans uploadimage ---------------"+this.user.id);
  const id = this.user.id; // ou ce que tu veux mettre

  this.http.post('http://localhost:8089/api/facial/upload?id='+id+'', formData).subscribe({
    next: (res) => {
      console.log('Image uploadée !', res);
      // Rediriger vers le Dashboard après le succès
      this.router.navigate(['/backoffice/user/profile/'+this.id]);
    },
    error: (err) => console.error('Erreur upload :', err)
  });

}

sendImage() {
  const base64Data = this.capturedImage.split(',')[1]; // On enlève le préfixe data:image/jpeg;base64,...
  const blob = this.base64ToBlob(base64Data, 'image/jpeg');
  const formData = new FormData();
  formData.append('file1', blob, 'photo.jpg');

  this.http.post<{ result: any }>(
    'http://localhost:8089/api/facial/compare-faces',
    formData
  ).subscribe({
    next: (res) => {
      console.log('Image envoyée !', res);
      // Utilisation du résultat :
      const parsedResult = JSON.parse(res.result);

      //console.log('Correspondance:', res.result ? 'Visages similaires' : 'Visages différents');

      // Tu peux aussi les stocker dans des variables :
      console.log('Correspondance:', res.result);
      this.matchFound = res.result;
      if(parsedResult.match==true){
        
        console.log('Visages similaires');
        this.message = '✅ Visages correspondants !';
      this.messageColor = 'green';
      }
      if(parsedResult.match==false)
      {
        this.message = '❌ Visages différents.';
        this.messageColor = 'red';
        console.log('Visages différents');
      }
    },
    error: (err) => console.error('Erreur de l\'envoi :', err)
  });
}





login(): void {
  console.log('je suis dans le login de webcam');
  this.errorMessage = ''; // Réinitialiser l'erreur avant chaque tentative

  const base64Data = this.capturedImage.split(',')[1]; // On enlève le préfixe data:image/jpeg;base64,...
  const blob = this.base64ToBlob(base64Data, 'image/jpeg');
  const formData = new FormData();
  formData.append('file1', blob, 'photo.jpg');

  this.http.post<any>('http://localhost:8089/api/facial/compare-faces',formData).subscribe({
    next: (response) => {
      console.log("dans respnse"+response.token);
      if (response.token) {
        this.authService.saveToken(response.token);
        const decodedToken= this.authService.getUserInfo(); // recuperer les infos du user a partir du token
        console.log(decodedToken);

        if (decodedToken.status == 1){ // verification du status du user , si 1 ok si 0 compte bloque
          const userRole = decodedToken?.role?.[0]?.role;
          if(userRole==='ADMIN' || userRole === 'PATIENT'){
            this.router.navigate(['/backoffice/dashboard']);
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
}

 base64ToBlob(base64: string, mime: string) {
   const byteChars = atob(base64);
   const byteNums = new Array(byteChars.length);
   for (let i = 0; i < byteChars.length; i++) {
     byteNums[i] = byteChars.charCodeAt(i);
   }
   const byteArray = new Uint8Array(byteNums);
   return new Blob([byteArray], { type: mime });
 }

// base64ToBlob(base64: string, mime: string): Blob {
//   // Check if base64 is null or undefined
//   if (!base64) {
//     throw new Error('Base64 string is empty or undefined');
//   }

//   // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,...")
//   const base64Data = base64.split(',')[1] || base64;

//   try {
//     // Validate the base64 string by attempting to decode it
//     const byteChars = atob(base64Data);
//     const byteNums = new Array(byteChars.length);
    
//     for (let i = 0; i < byteChars.length; i++) {
//       byteNums[i] = byteChars.charCodeAt(i);
//     }
    
//     const byteArray = new Uint8Array(byteNums);
//     return new Blob([byteArray], { type: mime });
//   } catch (error) {
//     console.error('Error converting Base64 to Blob:', error);
//     throw new Error('Failed to decode Base64 string. It might be malformed.');
//   }
// }
  
}
