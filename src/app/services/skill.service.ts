import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Skill } from '../models/skill';

interface ApiResponse<T> {
  message: string;
  data: T;
}


@Injectable({
  providedIn: 'root'
})
export class SkillService {
  private apiUrl = `${environment.apiUrl}/skills`;

  constructor(private http: HttpClient) { }

  // GET /api/skills
  getAll(): Observable<Skill[]> {
    return this.http.get<Skill[]>(this.apiUrl);
  }

  // GET /api/skills/{id}
  getById(id: number): Observable<Skill> {
    return this.http.get<Skill>(`${this.apiUrl}/${id}`);
  }

  // POST /api/skills
  create(skill: Partial<Skill>): Observable<ApiResponse<Skill>> {
    return this.http.post<ApiResponse<Skill>>(this.apiUrl, skill);
  }

  // PUT /api/skills/{id}
  update(id: number, skill: Partial<Skill>): Observable<ApiResponse<Skill>> {
    return this.http.put<ApiResponse<Skill>>(`${this.apiUrl}/${id}`, skill);
  }

  // DELETE /api/skills/{id}
  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
