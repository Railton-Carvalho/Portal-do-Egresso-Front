import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IOportunity } from '../interfaces/oportunity.interface';

@Injectable({
  providedIn: 'root'
})
export class OportunityService {
  private apiUrl = 'https://api/oportunity';

  constructor(private http: HttpClient) {}

  // Listar todas as oportunidades
  getAll(): Observable<IOportunity[]> {
    return this.http.get<IOportunity[]>(this.apiUrl);
  }

  // Buscar uma oportunidade por ID
  getById(id: number): Observable<IOportunity> {
    return this.http.get<IOportunity>(`${this.apiUrl}/${id}`);
  }

  // Criar nova oportunidade
  create(oportunity: IOportunity): Observable<IOportunity> {
    return this.http.post<IOportunity>(this.apiUrl, oportunity);
  }

  // Atualizar uma oportunidade
  update(id: number, oportunity: IOportunity): Observable<IOportunity> {
    return this.http.put<IOportunity>(`${this.apiUrl}/${id}`, oportunity);
  }

  // Deletar uma oportunidade
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Aprovar uma oportunidade (exemplo de ação específica)
  approve(id: number): Observable<IOportunity> {
    return this.http.post<IOportunity>(`${this.apiUrl}/${id}/approve`, {});
  }

  // Rejeitar uma oportunidade
  reject(id: number): Observable<IOportunity> {
    return this.http.post<IOportunity>(`${this.apiUrl}/${id}/reject`, {});
  }
}
