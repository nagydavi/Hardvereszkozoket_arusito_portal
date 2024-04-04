import { Injectable } from '@angular/core';
import { Laptop } from '../../Models/laptop';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';



interface ApiResponse {
  laptops: Laptop[]; // Define the expected shape of the response
}

@Injectable({
  providedIn: 'root'
})

export class LaptopsService {

  
  private url = environment.apiUrl + 'Laptops/' + 'Lread';
  latpops: Laptop[] = [];
  
  constructor(private http:HttpClient) { }


  getAll(): Observable<Laptop[]>{
    return this.http.get<ApiResponse>(this.url).pipe(
      map((res) => {
        this.latpops = res['laptops'];
        return this.latpops
      })
    )
  }
}
