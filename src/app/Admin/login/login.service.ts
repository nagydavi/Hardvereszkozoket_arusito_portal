import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../Models/user';

interface ApiResponse {
  users: User[]; // Define the expected shape of the response
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = environment.apiUrl + 'User/' + 'Uread';
  users: User[] = [];
  
  constructor(private http:HttpClient) { }


  getAll(): Observable<User[]>{
    return this.http.get<ApiResponse>(this.url).pipe(
      map((res) => {
        this.users = res['users'];
        return this.users
      })
    )
  }
  
}
