import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly URL = environment.api;

  constructor(private httpClient: HttpClient) { }

  addNewTrack$(name: string, album: string, cover: string, artist: string): Observable<any>{
    const body = {
      name,
      album,
      cover,
      artist
    }
    return this.httpClient.post(`${this.URL}/api/1.0/tracks/add`, body)
   }

   editTrack$(name: string, id: string): Observable<any>{
    return this.httpClient.put(`${this.URL}/api/1.0/tracks/edit/${id}`, {name})
   }

   deleteTrack$(id: string): Observable<any>{
    return this.httpClient.delete(`${this.URL}/api/1.0/tracks/delete/${id}`)
   }
}
