import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from '../../service/user-service.service';
import { User } from 'src/app/model/User';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css',
    "../../../assets/BackOffice/assets/css/bootstrap.min.css",
              "../../../assets/BackOffice/assets/css/demo.css",
              "../../../assets/BackOffice/assets/css/fonts.css",
              "../../../assets/BackOffice/assets/css/fonts.min.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.css",
              "../../../assets/BackOffice/assets/css/plugins.min.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.min.css",
            "../../../assets/css/bootstrap.min.css",
            "../../../assets/BackOffice/assets/css/formuser.css"]
})
export class UserFormComponent {

  roles = [
    { id: 1, role: 'ADMIN' },
    { id: 2, role: 'PATIENT' },
    { id: 3, role: 'COACH' },
    { id: 4, role: 'NUTRITIONIST' },
    { id: 5, role: 'PEDIATRICIAN' },
    { id: 6, role: 'GENERALIST' },
    { id: 7, role: 'BABYSITTER' },
    { id: 8, role: 'GYNECOLOGIST' }
  ];

  countries: string[] = [
    'Algeria', 'Angola', 'Argentina', 'Bolivia', 'Brazil', 'Burkina Faso', 'Cameroon', 
    'Canada', 'Chile', 'China', 'Colombia', 'Costa Rica', 'Croatia', 'Cuba', 'Denmark', 
    'DRC', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia', 
    'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Hungary', 'Iraq', 'Ireland', 'Italy', 
    'Ivory Coast', 'Japan', 'Jordan', 'Kenya', 'Kuwait', 'Latvia', 'Lebanon', 'Lithuania', 
    'Libya', 'Malaysia', 'Mali', 'Mexico', 'Morocco', 'Nicaragua', 'Netherlands', 'Nigeria', 
    'Niger', 'Norway', 'Oman', 'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Saudi Arabia', 'Senegal', 'Slovakia', 
    'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Syria', 
    'Tanzania', 'Thailand', 'Tunisia', 'United Arab Emirates', 'United Kingdom', 'United States', 
    'Uruguay', 'Venezuela', 'Vietnam'
];
  
  Userform: FormGroup;
  id! : number;
  User! : User;
  constructor(private userService:  UserServiceService,private rt:Router,private Ac :ActivatedRoute){
    this.Userform=new FormGroup({
      name: new FormControl('',[Validators.required]),
      age: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.minLength(10)]),// controle de saisie
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      roleTypes: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required,Validators.minLength(8)]),
      country: new FormControl('',[Validators.required]),
      image: new FormControl('')
      });
    }


    ngOnInit(){
      //recuperer l'id
      this.id=this.Ac.snapshot.params['id'];
      this.userService.getUserById(this.id).subscribe(
        (data) => {
          this.User = data,
          console.log(this.User)
          //3 ajouter les valeurs de l'objet User dans le formulaire
          this.Userform.patchValue({
            name: this.User.name,
            age: this.User.age,
            email: this.User.email,
            password: this.User.password,
            roleTypes: this.User.roleTypes[0].id,
            phone: this.User.phone,
            country: this.User.country,
            image: this.User.image
          })
        }
      )
    }

    save(){
      if (this.Userform.valid) {
        const newUser = {
          ...this.Userform.value, // Récupère title et description
          roleTypes: [{ id: this.Userform.value.roleTypes }]
          
        };
        console.log(this.Userform.value);

        if(this.id){
          console.log('update avec l id :',this.id);
          this.userService.updateUser(this.id,newUser).subscribe(
            ()=> this.rt.navigateByUrl('/backoffice/user/detail/'+this.id)
          )}
          else
          {
            this.userService.addUser(newUser).subscribe(
              ()=> this.rt.navigateByUrl('/backoffice/user')
            )
          }
      
  
    }
  }
}
