import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOportunity } from '../interfaces/oportunity.interface';
import { environment } from '../environments/environments';
import { AutenticationService } from './autentication.service';

@Injectable({
  providedIn: 'root'
})



export class OportunityService {

  private apiUrl = environment.apiUrl;

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private authService: AutenticationService) {}

  // Listar todas as oportunidades
  getAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/oportunidade`, {params: {page: page, size: size}});
  }

  // Buscar uma oportunidade por ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getOportunityPendentes(page: number, size: number, text: string): Observable<any>  {

    return this.http.get<any>(`${this.apiUrl}/oportunidade/pendentes`, {
      params: { page: page.toString(), size: size.toString(), titulo: text }
    });
  }
  
  getOportunityByIdEgresso(id: number, page: number, size: number): Observable<any>  {

    return this.http.get<any>(`${this.apiUrl}/oportunidade/by-egresso/${id}`, {
      params: { page: page.toString(), size: size.toString() },
      headers: this.headers,
    });

  }

  // Criar nova oportunidade
  create(oportunity: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/oportunidade/enviar-oportunidade`, oportunity);
  }

  // Atualizar uma oportunidade
  update(id: number, oportunity: IOportunity): Observable<IOportunity> {
    return this.http.put<IOportunity>(`${this.apiUrl}/${id}`, oportunity);
  }

  // Deletar uma oportunidade
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/oportunidade/totalDelete/${id}`);
  }

  reject(id: number): Observable<any> {

    const params = new HttpParams().set('token', this.authService.getToken() ?? '').set('status', 'REJECTED');

    return this.http.put<any>(`${this.apiUrl}/oportunidade/${id}/homologar`, null, { params });
  }

  // Desativar depoimento
  approve(id: number): Observable<any> {

    const params = new HttpParams().set('token', this.authService.getToken() ?? '').set('status', 'APROVED');

    return this.http.put<any>(`${this.apiUrl}/oportunidade/${id}/homologar`, null, { params });
  }
}
