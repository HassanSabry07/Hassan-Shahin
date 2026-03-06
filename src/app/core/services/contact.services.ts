import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContact } from '../models/contact.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
private apiURL = 'https://portfolio-nodejs-production.up.railway.app/contact';
  constructor(private _http: HttpClient) {}

  getContacts(): Observable<IContact[]> {
    return this._http.get<IContact[]>(this.apiURL);
  }

  createContact(data: IContact): Observable<IContact> {
    return this._http.post<IContact>(this.apiURL, data);
  }

  updateContact(id: string, data: IContact): Observable<IContact> {
    return this._http.put<IContact>(`${this.apiURL}/${id}`, data);
  }

  deleteContact(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }
}