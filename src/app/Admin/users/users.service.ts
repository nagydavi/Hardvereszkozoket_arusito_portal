import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../Models/user';
import { environment } from '../../../environments/environment';
import { UserRole } from '../../Models/userRole';

interface ApiResponse {
  users: User[]; 
}
interface ApiResponseRole {
  user_role: UserRole[];
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private url = environment.apiUrl + 'User/' + 'Uread';
  private urlRole = environment.apiUrl + 'User/' + 'URread';
  private urlCreateUser = environment.apiUrl + 'User/' +'Ucreate';
  private urlEditUser = environment.apiUrl + 'User/' +'Uupdate';

  
  users: User[] = [];
  roles: UserRole[] = [];
  
  constructor(private http:HttpClient) { }


  getAllUser(): Observable<User[]>{
    return this.http.get<ApiResponse>(this.url).pipe(
      map((res) => {
        this.users = res['users'];
        return this.users
      })
    )
  }

  getAllRole(): Observable<UserRole[]>{
    return this.http.get<ApiResponseRole>(this.urlRole).pipe(
      map((res) => {
        this.roles = res['user_role'];
        return this.roles
      })
    )
  }


  create(user: User): Observable<User[]> {
    return this.http.post<User>(this.urlCreateUser, user).pipe(
      map((res: any) => {
        this.users.push(res);
        return res['users'];
      })
    )
  }

  update(u: User): Observable<User[]> {

    return this.http.put(this.urlEditUser, u).pipe(
      map((res) => {
        this.getAllUser()
        const modifiedUser = this.users.find(user => user['id'] === u['id']);

        if(modifiedUser) {
          modifiedUser.name = u.name;
          modifiedUser.password = u.password;
          modifiedUser.type_id = u.type_id;
        }

        return this.users;
      })
    )
  }

}
