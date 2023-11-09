import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, catchError, map, mergeMap, of } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { TrackModel } from '@core/models/tracks.model';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) {}

  private skipById(listTracks:TrackModel[], id:number):Promise<TrackModel[]> {
    return new Promise((resolve, reject) => {
      const listTmp = listTracks.filter(a => a._id !== id);
      resolve(listTmp)
    })
  }


   getAllTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/api/1.0/tracks`)
    .pipe(
      map(({ data }:any) => {
        return data;
      }),
      catchError((err) => {
        alert('Error de conexión con el servidor =( , intenta más tarde');
        return of([])
      })
    )
   }

   getRandomTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/api/1.0/tracks`)
    .pipe(
      mergeMap(({ data }:any) => this.skipById(data, 1)),
      // map((reversedData:any) => {
      //   return reversedData.filter((track:TrackModel) => track._id !== 1);
      // }),
    )
   }
}
