import { Injectable } from '@angular/core';
import { User } from '../../../Models/user';
import { UserRole } from '../../../Models/userRole';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



interface ApiResponse {
  users: User[]; 
}
interface ApiResponseRole {
  user_role: UserRole[];
}


@Injectable({
  providedIn: 'root'
})
export class DialogService {


  private url = environment.apiUrl + 'User/' + 'Uread';
  private urlRole = environment.apiUrl + 'User/' + 'URread';
  private urlCreateUser = environment.apiUrl + 'User/' + 'Ucreate';
  
  users: User[] = [];
  roles: UserRole[] = [];


  constructor(private http:HttpClient) { }

  getAllRole(): Observable<UserRole[]>{
    return this.http.get<ApiResponseRole>(this.urlRole).pipe(
      map((res) => {
        this.roles = res['user_role'];
        return this.roles
      })
    )
  }

  getAllUser(): Observable<User[]>{
    return this.http.get<ApiResponse>(this.url).pipe(
      map((res) => {
        this.users = res['users'];
        return this.users
      })
    )
  }

  create(user: User): Observable<User[]> {
    return this.http.post(this.urlCreateUser, user).pipe(
      map((res: any) => {
        this.users.push(res);
        return this.users;
      })
    )
  }


}
