import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAbout } from '../models/about.model';

@Injectable({
  providedIn: 'root',
})
export class AboutServices {
 private apiURL = 'https://portfolio-nodejs-production.up.railway.app/about';
readonly imageBaseUrl = 'https://portfolio-nodejs-production.up.railway.app/uploads/';
  constructor(private _http: HttpClient) {}

  getAbouts(): Observable<IAbout[]> {
    return this._http.get<IAbout[]>(this.apiURL);
  }

  createAbout(formData: FormData): Observable<IAbout> {
    return this._http.post<IAbout>(this.apiURL, formData);
  }

  updateAbout(id: string, formData: FormData): Observable<IAbout> {
    return this._http.put<IAbout>(`${this.apiURL}/${id}`, formData);
  }

  deleteAbout(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }
}