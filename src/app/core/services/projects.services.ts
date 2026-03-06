import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjects } from '../models/projects.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectsServices {
  private apiURL = 'http://localhost:3000/projects';
  readonly imageBaseUrl = 'http://localhost:3000/uploads/';

  constructor(private _http: HttpClient) {}

  getProjects(): Observable<IProjects[]> {
    return this._http.get<IProjects[]>(this.apiURL);
  }

  createProject(formData: FormData): Observable<IProjects> {
    return this._http.post<IProjects>(this.apiURL, formData);
  }

  updateProject(id: string, formData: FormData): Observable<IProjects> {
    return this._http.put<IProjects>(`${this.apiURL}/${id}`, formData);
  }

  deleteProject(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiURL}/${id}`);
  }
}