import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Language } from '../models/language';

interface ApiResponse<T> {
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private apiUrl = `${environment.apiUrl}/languages`;

  constructor(private http: HttpClient) {}

  // GET /api/languages
  getAll(): Observable<Language[]> {
    return this.http.get<Language[]>(this.apiUrl);
  }

  // GET /api/languages/{id}
  getById(id: number): Observable<Language> {
    return this.http.get<Language>(`${this.apiUrl}/${id}`);
  }

  // POST /api/languages
  create(language: Partial<Language>): Observable<ApiResponse<Language>> {
    return this.http.post<ApiResponse<Language>>(this.apiUrl, language);
  }

  // PUT /api/languages/{id}
  update(id: number, language: Partial<Language>): Observable<ApiResponse<Language>> {
    return this.http.put<ApiResponse<Language>>(`${this.apiUrl}/${id}`, language);
  }

  // DELETE /api/languages/{id}
  delete(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
