import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateService {
  
  private baseUrl = environment.apiUrl + 'assets';

  constructor(private http: HttpClient) { }

 
}
