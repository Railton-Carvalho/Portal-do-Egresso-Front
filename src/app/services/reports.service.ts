import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AutenticationService } from './autentication.service';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AutenticationService) {}

  getGraficoTopSalarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reports/grafico-top-salarios`);
  }

  getGraficoEgressosPorCurso(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reports/grafico-egressos-por-curso`);
  }

  getGraficoPorMes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reports/egressos-por-mes`);
  }

}
