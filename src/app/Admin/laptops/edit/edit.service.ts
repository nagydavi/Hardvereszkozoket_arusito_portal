import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../Models/image';
import { Observable, map } from 'rxjs';
import { LaptopType } from '../../../Models/laptop_type';
import { OpSystem } from '../../../Models/opsys';


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
export class EditService {


    //image
    private readImageUrl = environment.apiUrl + 'Image/' + 'Iread';
    private createImageUrl = environment.apiUrl + 'Image/' + 'Icreate';
    private deleteImageUrl = environment.apiUrl + 'Image/' + 'Idelete';
  
    //assest
    private getAssetsUrl = environment.apiUrl + 'Upload/' + 'read';
    private deleteAssetsUrl = environment.apiUrl + 'Upload/' + 'delete';
    //LaptopType
    private urlLaptopType = environment.apiUrl + 'LaptopType/' + 'LTread';
    //OP
    private urlOpSystem = environment.apiUrl + 'OpSystem/' + 'OPread';

    image: Image[] = [];
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

    //Image
    getAllImageDB(): Observable<Image[]>{
      return this.http.get<ApiResponseImage>(this.readImageUrl).pipe(
        map((res) => {
          this.image = res['image'];
          return this.image
        })
      )
    }


    createImage(image: Image): Observable<Image[]> {
      return this.http.post<Image>(this.createImageUrl, image).pipe(
        map((res: any) => {
          this.image.push(res);
          return this.image;
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
    //Vége

    //Assest
    getAllImages(): Observable<string[]> {
      return this.http.get<string[]>(this.getAssetsUrl);
    }
    deleteFile(filename: string): Observable<any> {
      return this.http.post<any>(this.deleteAssetsUrl, { filename });
    }
  }
