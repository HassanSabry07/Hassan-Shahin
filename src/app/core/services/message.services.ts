import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMessage } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class MessageServices {
  private apiURL = 'https://portfolio-nodejs-production.up.railway.app/messages';

  constructor(private _http: HttpClient) {}

  getMessages(): Observable<IMessage[]> {
    return this._http.get<IMessage[]>(this.apiURL);
  }

  sendMessage(data: IMessage): Observable<IMessage> {
    return this._http.post<IMessage>(this.apiURL, data);
  }

  markAsRead(id: string): Observable<IMessage> {
    return this._http.put<IMessage>(`${this.apiURL}/${id}/read`, {});
  }

  deleteMessage(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }
}