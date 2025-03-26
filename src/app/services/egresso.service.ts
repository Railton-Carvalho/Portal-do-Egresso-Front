import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEgresso } from '../interfaces/egresso.interface'; // Assumindo que você tenha essa interface
import { environment } from '../environments/environments';
import { AutenticationService } from './autentication.service';
//import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EgressoService {


  private apiUrl = environment.apiUrl;

  // Cabeçalhos para as requisições HTTP
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient, private authService: AutenticationService) {}

  // Método para criar um egresso
  cadastrarEgresso(egresso: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/egresso`, egresso, { headers: this.headers });
  }

  // Método para atualizar um egresso
  atualizarEgresso(egresso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/egresso`, egresso, { headers: this.headers });
  }

  // Método para deletar um egresso
  deletarEgresso(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/egresso/totalDelete/${id}`, { headers: this.headers });
  }

  deletarEgressoLogica(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/egresso/logicalDelete/${id}`, { headers: this.headers });
  }

  // Método para recuperar a lista de egresso com paginação
  recuperarEgressos(pagina: number, tamanho: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/egresso`, {
      params: { page: pagina.toString(), size: tamanho.toString() },
      headers: this.headers,
    });
  }

  // Método para recuperar um egresso específico
  recuperarEgresso(cpf: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/egresso/cpf/${cpf}`, { headers: this.headers });
  }

  getEgressoById(id: number): Observable<any>  {

    return this.http.get<any>(`${this.apiUrl}/egresso/id/${id}`);
  }

  getEgressoByName(page: number, size: number, name: string): Observable<any>  {

    return this.http.get<any>(`${this.apiUrl}/egresso/by-name/${name}`, {
      params: { page: page.toString(), size: size.toString() },
      headers: this.headers,
    });
  }

  getEgressoPendentes(page: number, size: number): Observable<any>  {

    return this.http.get<any>(`${this.apiUrl}/egresso/pendentes`, {
      params: { page: page.toString(), size: size.toString() },
      headers: this.headers,
    });
  }
  
  recuperarCurso(id: number): Observable<any>{

    return this.http.get<any>(`${this.apiUrl}/egresso/${id}/cursos`, { headers: this.headers });

  }

  recuperarCargos(id: number): Observable<any>{

    return this.http.get<any>(`${this.apiUrl}/egresso/${id}/cargos`, { headers: this.headers });

  }

  aprovarEgresso(id: number): Observable<any> {

    const params = new HttpParams().set('token', this.authService.getToken() ?? '').set('status', 'APROVED');

    return this.http.put<any>(`${this.apiUrl}/egresso/${id}/homologar`, null, {params}) ;
  } 

  rejeitarEgresso(id: number): Observable<any> {

    const params = new HttpParams().set('token', this.authService.getToken() ?? '').set('status', 'REJECTED');

    return this.http.put<any>(`${this.apiUrl}/egresso/${id}/homologar`, null, {params}) ;
  }

}
