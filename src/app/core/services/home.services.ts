import { Observable } from "rxjs";
import { IHome } from "../models/home.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class HomeServices {

  private apiURL = 'http://localhost:3000/home';
  readonly imageBaseUrl = 'http://localhost:3000/uploads/';

  constructor(private _http: HttpClient) {}

  getHomes(): Observable<IHome[]> {
    return this._http.get<IHome[]>(this.apiURL);
  }

  getHomeById(id: string): Observable<IHome> {
    return this._http.get<IHome>(`${this.apiURL}/${id}`);
  }

  createHome(formData: FormData): Observable<IHome> {
    return this._http.post<IHome>(this.apiURL, formData);
  }

  updateHome(id: string, formData: FormData): Observable<IHome> {
    return this._http.put<IHome>(`${this.apiURL}/${id}`, formData);
  }

  deleteHome(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }
}