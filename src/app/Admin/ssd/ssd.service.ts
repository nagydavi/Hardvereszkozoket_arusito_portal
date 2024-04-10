import { Injectable } from '@angular/core';
import { SSD } from '../../Models/ssd';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';



interface ApiResponse {
  ssd: SSD[]; 
}

@Injectable({
  providedIn: 'root'
})



export class SsdService {

  private read = environment.apiUrl + 'SSD/' + 'Sread';

  ssd: SSD[] = [];


  constructor(private http:HttpClient) { }



  getAllSSD(): Observable<SSD[]>{
    return this.http.get<ApiResponse>(this.read).pipe(
      map((res) => {
        this.ssd = res['ssd'];
        return this.ssd
      })
    )
  }
}
