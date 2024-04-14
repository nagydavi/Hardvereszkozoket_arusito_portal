import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Image } from '../../../Models/image';
import { Observable, map } from 'rxjs';



interface ApiResponseImage {
  image: Image[]; 
}




@Injectable({
  providedIn: 'root'
})
export class EditService {

  //image
  private readImageUrl = environment.apiUrl + 'Image/' + 'Iread';
  private createImageUrl = environment.apiUrl + 'Image/' + 'Icreate';
  private deleteImageUrl = environment.apiUrl + 'Image/' + 'Idelete';


  image: Image[] = [];



  constructor(private http: HttpClient) { }



  //Image
  getAllImage(): Observable<Image[]>{
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
        return res['image'];
      })
    )
  }

  deleteImage(i: Image): Observable<Image[]> {
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



}
