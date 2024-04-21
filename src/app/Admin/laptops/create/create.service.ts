import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, map } from 'rxjs';
import { LaptopType } from '../../../Models/laptop_type';
import { OpSystem } from '../../../Models/opsys';
import { HttpClient, HttpParams } from '@angular/common/http';



interface ApiResponseType {
  laptopType: LaptopType[]; 
}
interface ApiResponseOP {
  opSys: OpSystem[]; 
}



@Injectable({
  providedIn: 'root'
})
export class CreateService {


  private urlLaptopCreate = environment.apiUrl + 'Laptops/' + 'Lcreate';
  //LaptopType
  private urlLaptopType = environment.apiUrl + 'LaptopType/' + 'LTread';
  //OP
  private urlOpSystem = environment.apiUrl + 'OpSystem/' + 'OPread';


  laptopType: LaptopType[] = [];
  opSys: OpSystem[] = [];

  constructor(private http: HttpClient) { }


  getAllType(): Observable<LaptopType[]>{
    return this.http.get<ApiResponseType>(this.urlLaptopType).pipe(
      map((res) => {
        this.laptopType = res['laptopType'];
        return this.laptopType
      })
    )
  }
  getAllOP(): Observable<OpSystem[]>{
    return this.http.get<ApiResponseOP>(this.urlOpSystem).pipe(
      map((res) => {
        this.opSys = res['opSys'];
        return this.opSys
      })
    )
  }

}
