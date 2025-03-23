import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEgresso } from '../interfaces/egresso.interface'; // Assumindo que você tenha essa interface
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EgressoService {
  private apiUrl = `http://api/egresso`; // URL da API do seu backend

  // Cabeçalhos para as requisições HTTP
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  // Método para criar um egresso
  cadastrarEgresso(egresso: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/cadastrar`, egresso, { headers: this.headers });
  }

  // Método para atualizar um egresso
  atualizarEgresso(egresso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/atualizar/${egresso.id}`, egresso, { headers: this.headers });
  }

  // Método para deletar um egresso
  deletarEgresso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deletar/${id}`, { headers: this.headers });
  }

  // Método para recuperar a lista de egresso com paginação
  recuperarEgressos(pagina: number, tamanho: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/listar`, {
      params: { pagina: pagina.toString(), tamanho: tamanho.toString() },
      headers: this.headers,
    });
  }

  // Método para recuperar um egresso específico
  recuperarEgresso(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recuperar/${id}`, { headers: this.headers });
  }

  aprovarEgresso(egresso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/aprovar/${egresso.id}`, egresso, { headers: this.headers });
  }

  rejeitarEgresso(egresso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/rejeitar/${egresso.id}`, egresso, { headers: this.headers });
  }

}
