import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkills } from '../models/skills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsServices {
private apiURL = 'https://portfolio-nodejs-production.up.railway.app/skills';

  constructor(private _http: HttpClient) {}

  getSkills(): Observable<ISkills[]> {
    return this._http.get<ISkills[]>(this.apiURL);
  }

  createSkill(data: ISkills): Observable<ISkills> {
    return this._http.post<ISkills>(this.apiURL, data);
  }

  updateSkill(id: string, data: ISkills): Observable<ISkills> {
    return this._http.put<ISkills>(`${this.apiURL}/${id}`, data);
  }

  deleteSkill(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }
}