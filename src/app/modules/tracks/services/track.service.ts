import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, catchError, map, mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient, private router: Router) {}

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
        console.log(data);
        return data;
      }),
      catchError((err) => {
        alert('Error de conexión con el servidor =( , intenta más tarde');
        return this.router.navigate(['/auth/login']);
      })
    )
   }

   getRandomTracks$(): Observable<any>{
    return this.httpClient.get(`${this.URL}/api/1.0/tracks`)
    .pipe(
      mergeMap(({ data }:any) => this.skipById(data, 1)),
    )
   }
}
