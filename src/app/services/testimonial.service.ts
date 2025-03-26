import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITestimonial } from '../interfaces/testimonial.interface';
import { environment } from '../environments/environments';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root'
})
export class TestimonialService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AutenticationService) {}

  // Obter todos os depoimentos
  getAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/depoimento`, {params: {page: page.toString(), size: size.toString()}});
  }

  getPendentes(page: number, size: number, text: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/depoimento/pendentes`, {params: {page: page.toString(), size: size.toString(), texto: text }});
  }

  // Obter um depoimento por ID
  getById(id: number): Observable<ITestimonial> {
    return this.http.get<ITestimonial>(`${this.apiUrl}/${id}`);
  }

  getTestimonialByIdEgresso(id: number, page: number, size: number): Observable<any>  {

    return this.http.get<any>(`${this.apiUrl}/depoimento/by-egresso/${id}`, {
      params: { page: page.toString(), size: size.toString() },
    });

  }

  // Criar novo depoimento
  create(testimonial: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/depoimento/enviar-depoimento`, testimonial);
  }

  // Atualizar um depoimento existente
  update(id: number, testimonial: ITestimonial): Observable<ITestimonial> {
    return this.http.put<ITestimonial>(`${this.apiUrl}/${id}`, testimonial);
  }

  // Deletar um depoimento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/depoimento/totalDelete/${id}`);
  }

  // Ativar depoimento
  reject(id: number): Observable<any> {

    const params = new HttpParams().set('token', this.authService.getToken() ?? '').set('status', 'REJECTED');

    return this.http.put<any>(`${this.apiUrl}/depoimento/${id}/homologar`, null, {params});
  }

  // Desativar depoimento
  approve(id: number): Observable<any> {

    const params = new HttpParams().set('token', this.authService.getToken() ?? '').set('status', 'APROVED');

    return this.http.put<any>(`${this.apiUrl}/depoimento/${id}/homologar`, null, { params });
  }
}
