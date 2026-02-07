import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PersonalInfo } from '../models/personal-info';

interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private apiUrl = `${environment.apiUrl}/personal-info`;

  constructor(private http: HttpClient) {}

  // GET /api/personal-info (retorna el primer registro)
  get(): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>(this.apiUrl);
  }

  // GET /api/personal-info/{id}
  getById(id: number): Observable<PersonalInfo> {
    return this.http.get<PersonalInfo>(`${this.apiUrl}/${id}`);
  }

  // POST /api/personal-info
  create(personalInfo: Partial<PersonalInfo>): Observable<ApiResponse<PersonalInfo>> {
    return this.http.post<ApiResponse<PersonalInfo>>(this.apiUrl, personalInfo);
  }

  // PUT /api/personal-info/{id}
  update(id: number, personalInfo: Partial<PersonalInfo>): Observable<ApiResponse<PersonalInfo>> {
    return this.http.put<ApiResponse<PersonalInfo>>(`${this.apiUrl}/${id}`, personalInfo);
  }

  // DELETE /api/personal-info/{id}
  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
