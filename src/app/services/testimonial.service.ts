import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITestimonial } from '../interfaces/testimonial.interface';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = 'https://api/testimonials';

  constructor(private http: HttpClient) {}

  // Obter todos os depoimentos
  getAll(): Observable<ITestimonial[]> {
    return this.http.get<ITestimonial[]>(this.apiUrl);
  }

  // Obter um depoimento por ID
  getById(id: number): Observable<ITestimonial> {
    return this.http.get<ITestimonial>(`${this.apiUrl}/${id}`);
  }

  // Criar novo depoimento
  create(testimonial: ITestimonial): Observable<ITestimonial> {
    return this.http.post<ITestimonial>(this.apiUrl, testimonial);
  }

  // Atualizar um depoimento existente
  update(id: number, testimonial: ITestimonial): Observable<ITestimonial> {
    return this.http.put<ITestimonial>(`${this.apiUrl}/${id}`, testimonial);
  }

  // Deletar um depoimento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Ativar depoimento
  reject(id: number): Observable<ITestimonial> {
    return this.http.patch<ITestimonial>(`${this.apiUrl}/${id}/activate`, {});
  }

  // Desativar depoimento
  approve(id: number): Observable<ITestimonial> {
    return this.http.patch<ITestimonial>(`${this.apiUrl}/${id}/deactivate`, {});
  }
}
