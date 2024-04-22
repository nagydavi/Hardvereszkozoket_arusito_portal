import { Injectable } from '@angular/core';
import { Laptop } from '../../Models/laptop';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { LaptopType } from '../../Models/laptop_type';
import { Image } from '../../Models/image';
import { OpSystem } from '../../Models/opsys';
import { Pendrive } from '../../Models/pendrive';
import { Ram } from '../../Models/ram';
import { SSD } from '../../Models/ssd';

interface ApiResponseLaptop {
  laptops: Laptop[]; // Define the expected shape of the response
}
interface ApiResponseImage {
  image: Image[]; 
}
interface ApiResponseType {
  laptopType: LaptopType[]; 
}
interface ApiResponseOP {
  opSys: OpSystem[]; 
}
interface ApiResponsePendrive {
  pendrive: Pendrive[]; 
}
interface ApiResponseRam {
  ram: Ram[]; 
}
interface ApiResponseSsd {
  ssd: SSD[]; 
}



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  //imageDb
  private readImageUrl = environment.apiUrl + 'Image/' + 'Iread';
  //LaptopType
  private urlLaptopType = environment.apiUrl + 'LaptopType/' + 'LTread';
  //OP
  private urlOpSystem = environment.apiUrl + 'OpSystem/' + 'OPread';
  //Laptop
  private urlLaptopRead = environment.apiUrl + 'Laptops/' + 'Lread';
  //Pendrive
  private readPendriveUrl = environment.apiUrl + 'Pendrive/' + 'Pread';
  //SSD
  private readSssdUrl = environment.apiUrl + 'SSD/' + 'Sread';
  //Ram
  private readRamUrl = environment.apiUrl + 'Ram/' + 'Rread';



  laptops: Laptop[] = [];
  opSys: OpSystem[] = [];
  laptopType: LaptopType[] = [];
  image: Image[] = [];
  pendrive: Pendrive[] = [];
  ram: Ram[] = [];
  ssd: SSD[] = [];



    
  constructor(private http:HttpClient) { }



  getAllLaptop(): Observable<Laptop[]>{
    return this.http.get<ApiResponseLaptop>(this.urlLaptopRead).pipe(
      map((res) => {
        this.laptops = res['laptops'];
        return this.laptops
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
  getAllLaptopType(): Observable<LaptopType[]>{
    return this.http.get<ApiResponseType>(this.urlLaptopType).pipe(
      map((res) => {
        this.laptopType = res['laptopType'];
        return this.laptopType
      })
    )
  }
  getAllImageDB(): Observable<Image[]>{
    return this.http.get<ApiResponseImage>(this.readImageUrl).pipe(
      map((res) => {
        this.image = res['image'];
        return this.image
      })
    )
  }
  getAllPendrive(): Observable<Pendrive[]>{
    return this.http.get<ApiResponsePendrive>(this.readPendriveUrl).pipe(
      map((res) => {
        this.pendrive = res['pendrive'];
        return this.pendrive
      })
    )
  }
  getAllRam(): Observable<Ram[]>{
    return this.http.get<ApiResponseRam>(this.readRamUrl).pipe(
      map((res) => {
        this.ram = res['ram'];
        return this.ram
      })
    )
  }
  getAllSSD(): Observable<SSD[]>{
    return this.http.get<ApiResponseSsd>(this.readSssdUrl).pipe(
      map((res) => {
        this.ssd = res['ssd'];
        return this.ssd
      })
    )
  }

}
