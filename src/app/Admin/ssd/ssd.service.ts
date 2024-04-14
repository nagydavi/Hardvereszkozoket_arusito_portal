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

@Injectable({
  providedIn: 'root'
})



export class SsdService {

  private readSssdUrl = environment.apiUrl + 'SSD/' + 'Sread';
  private createSsdUrl = environment.apiUrl + 'SSD/' + 'Screate';
  private editSsdUrl = environment.apiUrl + 'SSD/' + 'Supdate';
  private deleteSsdUrl = environment.apiUrl + 'SSD/' + 'Sdelete';


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
        return res['ssd'];
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
}
