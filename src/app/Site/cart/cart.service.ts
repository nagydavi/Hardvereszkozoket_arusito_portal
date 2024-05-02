import { Injectable } from '@angular/core';
import { Order } from '../../Models/order';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


interface ApiResponseType {
  laptopType: Order[]; 
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private urlOrderCreate = environment.apiUrl + 'Order/' + 'Ocreate';


  orders: Order[] = [];


  constructor(private http:HttpClient) { }

  create(order: Order): Observable<Order[]> {
    return this.http.post<Order>(this.urlOrderCreate, order).pipe(
      map((res: any) => {
        this.orders.push(res);
        return this.orders;
      })
    )
  }
}
