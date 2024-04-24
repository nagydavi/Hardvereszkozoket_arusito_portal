import { Injectable } from '@angular/core';
import { Ram} from '../../Models/ram';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Image } from '../../Models/image';

interface ApiResponse {
  ram: Ram[]; 
}
interface ApiResponseImage {
  image: Image[]; 
}


@Injectable({
  providedIn: 'root'
})
export class RamService {

  private readRamUrl = environment.apiUrl + 'Ram/' + 'Rread';
  private createRamUrl = environment.apiUrl + 'Ram/' + 'Rcreate';
  private editRamUrl = environment.apiUrl + 'Ram/' + 'Rupdate';
  private deleteRamUrl = environment.apiUrl + 'Ram/' + 'Rdelete';

   //imageDb
   private deleteImageUrl = environment.apiUrl + 'Image/' + 'Idelete';
   private readImageUrl = environment.apiUrl + 'Image/' + 'Iread';
   //assest
   private deleteAssetsUrl = environment.apiUrl + 'Upload/' + 'delete';
 
 
   image: Image[] = [];
   ram: Ram[] = [];
 
   constructor(private http:HttpClient) { }

   getAllRam(): Observable<Ram[]>{
    return this.http.get<ApiResponse>(this.readRamUrl).pipe(
      map((res) => {
        this.ram = res['ram'];
        return this.ram
      })
    )
  }
  create(ram: Ram): Observable<Ram[]> {
    return this.http.post<Ram>(this.createRamUrl, ram).pipe(
      map((res: any) => {
        this.ram.push(res);
        return this.ram;
      })
    )
  }
  update(r: Ram): Observable<Ram[]> {
    return this.http.put(this.editRamUrl, r).pipe(
      map((res) => {
        this.getAllRam()
        const modifiedRam = this.ram.find(ram => ram['id'] === r['id']);

        if(modifiedRam) {
          modifiedRam.name = r.name;
          modifiedRam.sku = r.sku;
          modifiedRam.warranty = r.warranty;
          modifiedRam.discount = r.discount;
          modifiedRam.storage = r.storage;
          modifiedRam.price = r.price;
          modifiedRam.discountprice = r.discountprice;


        }

        return this.ram;
      })
    )
  }
  delete(r: Ram): Observable<Ram[]> {
    const params = new HttpParams().set('id', r.id!.toString());
    return this.http.delete(this.deleteRamUrl, {params: params}).pipe(
      map((res) => {
        const filter = this.ram.filter((ram) => {
          return ram['id'] !== r.id;
        })

        return this.ram = filter;
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
