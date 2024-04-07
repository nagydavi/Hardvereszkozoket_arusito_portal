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

}
