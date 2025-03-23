import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ManageEgressoService {
  private egressoSubject = new BehaviorSubject<any | null>(null); // começa nulo

  egresso$ = this.egressoSubject.asObservable();

  emitirEgresso(dado: any) {
    this.egressoSubject.next(dado);
  }

  setEgresso(dados: any) {
    this.egressoSubject.next(dados);
  }

  getLastEgresso() {
    return this.egressoSubject.getValue(); // agora funciona!
  }

  clearEgresso() {
    this.egressoSubject.next(null);
  }
}