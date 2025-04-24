import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // URL = 'http://localhost:3000/users';
  URL = 'http://localhost:8089/user';
  constructor(private http: HttpClient) { }
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.URL + '/list');
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.URL + '/retrieve-user/' + id);
  }
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.URL + '/retrieve-user-email/' + email);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.URL + '/remove-user/' + id);
  }

  addUser(res: User): Observable<User> {
    if(res.roleTypes[0].role == 'ADMIN' || res.roleTypes[0].role == 'PATIENT')
    {
      res.status = 1;
    }else
    {
      res.status = 2;
    }

    return this.http.post<User>(this.URL+'/add-user',res);
  }

  updateUser(id: number, res: User): Observable<User> {
    res.status = 1;
    return this.http.put<User>(this.URL + '/modify/' + id, res);
  }
 
  ActivateUser(id: number) 
  {
      return this.http.put<User>(this.URL + '/activate-user/' + id,{});
  }

  BlockUser(id: number) 
  {
      return this.http.put<User>(this.URL + '/block-user/' + id,{});
  }


}
