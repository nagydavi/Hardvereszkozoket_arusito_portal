import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Image } from '../../Models/image';
import { Pendrive } from '../../Models/pendrive';

interface ApiResponse {
  pendrive: Pendrive[]; 
}
interface ApiResponseImage {
  image: Image[]; 
}


@Injectable({
  providedIn: 'root'
})
export class PendriveService {

  private readPendriveUrl = environment.apiUrl + 'Pendrive/' + 'Pread';
  private createPendriveUrl = environment.apiUrl + 'Pendrive/' + 'Pcreate';
  private editPendriveUrl = environment.apiUrl + 'Pendrive/' + 'Pupdate';
  private deletePendriveUrl = environment.apiUrl + 'Pendrive/' + 'Pdelete';

  //imageDb
  private deleteImageUrl = environment.apiUrl + 'Image/' + 'Idelete';
  private readImageUrl = environment.apiUrl + 'Image/' + 'Iread';
  //assest
  private deleteAssetsUrl = environment.apiUrl + 'Upload/' + 'delete';


  image: Image[] = [];
  pendrive: Pendrive[] = [];


  constructor(private http:HttpClient) { }
  

  getAllPendrive(): Observable<Pendrive[]>{
    return this.http.get<ApiResponse>(this.readPendriveUrl).pipe(
      map((res) => {
        this.pendrive = res['pendrive'];
        return this.pendrive
      })
    )
  }
  create(pendrive: Pendrive): Observable<Pendrive[]> {
    return this.http.post<Pendrive>(this.createPendriveUrl, pendrive).pipe(
      map((res: any) => {
        this.pendrive.push(res);
        return this.pendrive;
      })
    )
  }
  update(p: Pendrive): Observable<Pendrive[]> {
    return this.http.put(this.editPendriveUrl, p).pipe(
      map((res) => {
        this.getAllPendrive()
        const modifiedPendrive = this.pendrive.find(pendrive => pendrive['id'] === p['id']);

        if(modifiedPendrive) {
          modifiedPendrive.name = p.name;
          modifiedPendrive.sku = p.sku;
          modifiedPendrive.warranty = p.warranty;
          modifiedPendrive.discount = p.discount;
          modifiedPendrive.storage = p.storage;
          modifiedPendrive.writespeed = p.writespeed;
          modifiedPendrive.price = p.price;
          modifiedPendrive.discountprice = p.discountprice;


        }

        return this.pendrive;
      })
    )
  }
  delete(p: Pendrive): Observable<Pendrive[]> {
    const params = new HttpParams().set('id', p.id!.toString());
    return this.http.delete(this.deletePendriveUrl, {params: params}).pipe(
      map((res) => {
        const filter = this.pendrive.filter((pendrive) => {
          return pendrive['id'] !== p.id;
        })

        return this.pendrive = filter;
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
