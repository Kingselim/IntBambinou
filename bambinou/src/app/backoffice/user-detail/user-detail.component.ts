import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { User } from 'src/app/model/User';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css',
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
export class UserDetailComponent {
constructor(private Ac: ActivatedRoute, private userService: UserServiceService) { }
id!: number
user!: User
ngOnInit(): void {
  this.id = this.Ac.snapshot.params['id']
  this.userService.getUserById(this.id).subscribe(data => {
    this.user = data
    console.log('User Data:', this.user.email);
    console.log('Roles:', this.user.roleTypes);
    console.log('Type de roleTypes:', typeof this.user.roleTypes);

  })
 
  
  
  
}

}
