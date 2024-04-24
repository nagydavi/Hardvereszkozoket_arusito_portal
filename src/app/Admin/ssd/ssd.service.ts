import { Injectable } from '@angular/core';
import { SSD } from '../../Models/ssd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Image } from '../../Models/image';



interface ApiResponse {
  ssd: SSD[]; 
}
interface ApiResponseImage {
  image: Image[]; 
}

@Injectable({
  providedIn: 'root'
})



export class SsdService {

  private readSssdUrl = environment.apiUrl + 'SSD/' + 'Sread';
  private createSsdUrl = environment.apiUrl + 'SSD/' + 'Screate';
  private editSsdUrl = environment.apiUrl + 'SSD/' + 'Supdate';
  private deleteSsdUrl = environment.apiUrl + 'SSD/' + 'Sdelete';

  //imageDb
  private deleteImageUrl = environment.apiUrl + 'Image/' + 'Idelete';
  private readImageUrl = environment.apiUrl + 'Image/' + 'Iread';
  //assest
  private deleteAssetsUrl = environment.apiUrl + 'Upload/' + 'delete';


  image: Image[] = [];
  ssd: SSD[] = [];

  constructor(private http:HttpClient) { }



  getAllSSD(): Observable<SSD[]>{
    return this.http.get<ApiResponse>(this.readSssdUrl).pipe(
      map((res) => {
        this.ssd = res['ssd'];
        return this.ssd
      })
    )
  }


  create(ssd: SSD): Observable<SSD[]> {
    return this.http.post<SSD>(this.createSsdUrl, ssd).pipe(
      map((res: any) => {
        this.ssd.push(res);
        return this.ssd;
      })
    )
  }

  update(s: SSD): Observable<SSD[]> {
    return this.http.put(this.editSsdUrl, s).pipe(
      map((res) => {
        this.getAllSSD()
        const modifiedSsd = this.ssd.find(ssd => ssd['id'] === s['id']);

        if(modifiedSsd) {
          modifiedSsd.name = s.name;
          modifiedSsd.sku = s.sku;
          modifiedSsd.warranty = s.warranty;
          modifiedSsd.discount = s.discount;
          modifiedSsd.storage = s.storage;
          modifiedSsd.price = s.price;
          modifiedSsd.discountprice = s.discountprice;

        }

        return this.ssd;
      })
    )
  }

  delete(s: SSD): Observable<SSD[]> {
    const params = new HttpParams().set('id', s.id!.toString());
    return this.http.delete(this.deleteSsdUrl, {params: params}).pipe(
      map((res) => {
        const filter = this.ssd.filter((ssd) => {
          return ssd['id'] !== s.id;
        })

        return this.ssd = filter;
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
