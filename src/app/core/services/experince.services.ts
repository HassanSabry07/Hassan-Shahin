import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExperince } from '../models/Experince.model ';

@Injectable({
  providedIn: 'root',
})
export class ExperinceServices {
  private apiURL = 'https://portfolio-nodejs-production.up.railway.app/experience';
  readonly imageBaseUrl = 'https://portfolio-nodejs-production.up.railway.app/uploads/';

  constructor(private _http: HttpClient) {}

  getExperiences(): Observable<IExperince[]> {
    return this._http.get<IExperince[]>(this.apiURL);
  }

  getExperienceById(id: string): Observable<IExperince> {
    return this._http.get<IExperince>(`${this.apiURL}/${id}`);
  }

  createExperience(formData: FormData): Observable<IExperince> {
    return this._http.post<IExperince>(this.apiURL, formData);
  }

  updateExperience(id: string, formData: FormData): Observable<IExperince> {
    return this._http.put<IExperince>(`${this.apiURL}/${id}`, formData);
  }

  deleteExperience(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }
}