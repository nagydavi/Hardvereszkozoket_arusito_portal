import { Injectable } from '@angular/core';
import { Laptop } from '../../Models/laptop';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { LaptopType } from '../../Models/laptop_type';
import { Image } from '../../Models/image';
import { OpSystem } from '../../Models/opsys';




interface ApiResponse {
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

@Injectable({
  providedIn: 'root'
})

export class LaptopsService {

  //imageDb
  private deleteImageUrl = environment.apiUrl + 'Image/' + 'Idelete';
  private readImageUrl = environment.apiUrl + 'Image/' + 'Iread';
  //assest
  private deleteAssetsUrl = environment.apiUrl + 'Upload/' + 'delete';
  //LaptopType
  private urlLaptopType = environment.apiUrl + 'LaptopType/' + 'LTread';
  //OP
  private urlOpSystem = environment.apiUrl + 'OpSystem/' + 'OPread';
  //Laptop
  private urlLaptopRead = environment.apiUrl + 'Laptops/' + 'Lread';
  private urlLaptopUpdate = environment.apiUrl + 'Laptops/' + 'Lupdate';
  private urlLaptopCreate = environment.apiUrl + 'Laptops/' + 'Lcreate';
  private urlLaptopDelete = environment.apiUrl + 'Laptops/' + 'Ldelete';



  laptops: Laptop[] = [];
  opSys: OpSystem[] = [];
  laptopType: LaptopType[] = [];
  image: Image[] = [];
  
  constructor(private http:HttpClient) { }


  getAll(): Observable<Laptop[]>{
    return this.http.get<ApiResponse>(this.urlLaptopRead).pipe(
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

  create(laptop: Laptop): Observable<Laptop[]> {
    return this.http.post<Laptop>(this.urlLaptopCreate, laptop).pipe(
      map((res: any) => {
        this.laptops.push(res);
        return this.laptops;
      })
    )
  }
  update(l: Laptop): Observable<Laptop[]> {
    return this.http.put(this.urlLaptopUpdate, l).pipe(
      map((res) => {
        this.getAll()
        const modifiedLaptop = this.laptops.find(laptop => laptop['id'] === l['id']);

        if (modifiedLaptop) {
          modifiedLaptop.name = l.name;
          modifiedLaptop.resolution = l.resolution;
          modifiedLaptop.screen = l.screen;
          modifiedLaptop.processor = l.processor;
          modifiedLaptop.grafic_card = l.grafic_card;
          modifiedLaptop.ram = l.ram;
          modifiedLaptop.ssd = l.ssd;
          modifiedLaptop.op_system_id = l.op_system_id;
          modifiedLaptop.price = l.price;
          modifiedLaptop.warranty = l.warranty;
          modifiedLaptop.battery = l.battery;
          modifiedLaptop.weight = l.weight;
          modifiedLaptop.keyboard = l.keyboard;
          modifiedLaptop.laptop_type_id = l.laptop_type_id;
          modifiedLaptop.discount = l.discount;
          modifiedLaptop.discountprice = l.discountprice;
      }
      

        return this.laptops;
      })
    )
  }
  delete(l: Laptop): Observable<Laptop[]> {
    const params = new HttpParams().set('id', l.id!.toString());
    return this.http.delete(this.urlLaptopDelete, {params: params}).pipe(
      map((res) => {
        const filter = this.laptops.filter((laptop) => {
          return laptop['id'] !== l.id;
        })

        return this.laptops = filter;
      })
    )
  }
  //ImageDB

  getAllImageDB(): Observable<Image[]>{
    return this.http.get<ApiResponseImage>(this.readImageUrl).pipe(
      map((res) => {
        this.image = res['image'];
        return this.image
      })
    )
  }

  deleteImageDB(i: Image): Observable<Image[]> {
    const params = new HttpParams().set('id', i.id!.toString());
    return this.http.delete(this.deleteImageUrl, {params: params}).pipe(
      map((res) => {
        const filter = this.image.filter((image) => {
          return image['id'] !== i.id;
        })

        return this.image = filter;
      })
    )
  }
  //Assest
  deleteFile(filename: string): Observable<any> {
    return this.http.post<any>(this.deleteAssetsUrl, { filename });
  }
}
