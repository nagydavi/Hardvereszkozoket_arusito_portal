import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../Models/order';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';


interface ApiResponse {
  order: Order[]; 
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readOrderdUrl = environment.apiUrl + 'Order/' + 'Oread';


  order: Order[] = [];

  constructor(private http:HttpClient) { }


  getAllOrder(): Observable<Order[]>{
    return this.http.get<ApiResponse>(this.readOrderdUrl).pipe(
      map((res) => {
        this.order = res['order'];
        return this.order
      })
    )
  }

}
