import { Injectable } from '@angular/core';
import { SSD } from '../../Models/ssd';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';



interface ApiResponse {
  ssd: SSD[]; 
}

@Injectable({
  providedIn: 'root'
})



export class SsdService {

  private read = environment.apiUrl + 'SSD/' + 'Sread';
  private createSsd = environment.apiUrl + 'SSD/' + 'Screate';
  private editSsd = environment.apiUrl + 'SSD/' + 'Supdate';
  private deleteSsd = environment.apiUrl + 'SSD/' + 'Sdelete';



  ssd: SSD[] = [];


  constructor(private http:HttpClient) { }



  getAllSSD(): Observable<SSD[]>{
    return this.http.get<ApiResponse>(this.read).pipe(
      map((res) => {
        this.ssd = res['ssd'];
        return this.ssd
      })
    )
  }


  create(ssd: SSD): Observable<SSD[]> {
    return this.http.post<SSD>(this.createSsd, ssd).pipe(
      map((res: any) => {
        this.ssd.push(res);
        return res['users'];
      })
    )
  }

  update(s: SSD): Observable<SSD[]> {
    return this.http.put(this.editSsd, s).pipe(
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
    return this.http.delete(this.deleteSsd, {params: params}).pipe(
      map((res) => {
        const filter = this.ssd.filter((ssd) => {
          return ssd['id'] !== s.id;
        })

        return this.ssd = filter;
      })
    )
  }
}
