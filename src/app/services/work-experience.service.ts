import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { WorkExperience } from '../models/work-experience';

interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService {
  private apiUrl = `${environment.apiUrl}/work-experiences`;

  constructor(private http: HttpClient) {}

  // GET /api/work-experiences
  getAll(): Observable<WorkExperience[]> {
    return this.http.get<WorkExperience[]>(this.apiUrl);
  }

  // GET /api/work-experiences/{id}
  getById(id: number): Observable<WorkExperience> {
    return this.http.get<WorkExperience>(`${this.apiUrl}/${id}`);
  }

  // POST /api/work-experiences
  create(workExperience: Partial<WorkExperience>): Observable<ApiResponse<WorkExperience>> {
    return this.http.post<ApiResponse<WorkExperience>>(this.apiUrl, workExperience);
  }

  // PUT /api/work-experiences/{id}
  update(id: number, workExperience: Partial<WorkExperience>): Observable<ApiResponse<WorkExperience>> {
    return this.http.put<ApiResponse<WorkExperience>>(`${this.apiUrl}/${id}`, workExperience);
  }

  // DELETE /api/work-experiences/{id}
  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
