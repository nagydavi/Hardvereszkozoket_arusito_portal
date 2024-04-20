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

  //assest
  private getAssetsUrl = environment.apiUrl + 'Upload/' + 'read';
  private deleteAssetsUrl = environment.apiUrl + 'Upload/' + 'delete';



  image: Image[] = [];



  constructor(private http: HttpClient) { }



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
    console.log(i);
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
