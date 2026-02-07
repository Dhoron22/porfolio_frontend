import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Education } from '../models/education';

interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private apiUrl = `${environment.apiUrl}/education`;

  constructor(private http: HttpClient) {}

  // GET /api/education
  getAll(): Observable<Education[]> {
    return this.http.get<Education[]>(this.apiUrl);
  }

  // GET /api/education/{id}
  getById(id: number): Observable<Education> {
    return this.http.get<Education>(`${this.apiUrl}/${id}`);
  }

  // POST /api/education
  create(education: Partial<Education>): Observable<ApiResponse<Education>> {
    return this.http.post<ApiResponse<Education>>(this.apiUrl, education);
  }

  // PUT /api/education/{id}
  update(id: number, education: Partial<Education>): Observable<ApiResponse<Education>> {
    return this.http.put<ApiResponse<Education>>(`${this.apiUrl}/${id}`, education);
  }

  // DELETE /api/education/{id}
  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
