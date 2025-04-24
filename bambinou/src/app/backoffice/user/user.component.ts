import { Component } from '@angular/core';
import { UserServiceService } from '../../service/user-service.service';
import { User } from 'src/app/model/User';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css',"../../../assets/BackOffice/assets/css/bootstrap.min.css",
              "../../../assets/BackOffice/assets/css/demo.css",
              "../../../assets/BackOffice/assets/css/fonts.css",
              "../../../assets/BackOffice/assets/css/fonts.min.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.css",
              "../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class UserComponent {
  listUser!: User[]; 

  searchTerm: string = "";
  selectedRole: string = '';
  roles: string[] = [
    'PATIENT', 'ADMIN', 'COACH', 'NUTRITIONIST',
    'PEDIATRICIAN', 'GENERALIST', 'BABYSITTER', 'GYNECOLOGIST'
  ];



  CurrentEmail! : string;

  constructor(private userService: UserServiceService, private authService: AuthService) { }
  
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.authService.getDecodedToken(token);
      if (decodedToken) {
        this.CurrentEmail = decodedToken.sub;
        console.log(this.CurrentEmail);
      }
    }
    this.userService.getUser().subscribe(
      (data) => {
        this.listUser = data;
      }
    
    );
  }
  
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(
      () => this.ngOnInit()
    );
  }

  ActivateUser(id: number) {
    this.userService.ActivateUser(id).subscribe(
      () => this.ngOnInit()
    );
  }
  
  BlockUser(id: number) {
    this.userService.BlockUser(id).subscribe(
      () => this.ngOnInit()
    );
  }
  
  get filteredUser(): User[] {
    return this.listUser.filter(user =>
      user.name.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  get filteredUsers() {
    return this.listUser.filter(user => {
      const matchName = user.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchRole = this.selectedRole ? user.roleTypes[0].role === this.selectedRole : true;
      return matchName && matchRole;
    });
  }
}
