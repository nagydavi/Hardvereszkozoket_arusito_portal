import { Injectable } from '@angular/core';
import { User } from '../../../Models/user';
import { UserRole } from '../../../Models/userRole';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpClientModule,  HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



interface ApiResponseRole {
  user_role: UserRole[];
}


@Injectable({
  providedIn: 'root'
})
export class EditService {

  private urlRole = environment.apiUrl + 'User/' + 'URread';
  
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
}
