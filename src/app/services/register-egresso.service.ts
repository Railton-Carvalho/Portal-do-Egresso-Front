import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IEgresso } from '../interfaces/egresso.interface';

@Injectable({
  providedIn: 'root'
})
export class RegisterEgressoService {
  private egressoSubject = new BehaviorSubject<any | null>(null);

  egresso$ = this.egressoSubject.asObservable();

  emitirEgresso(dado: any) {
    this.egressoSubject.next(dado);
  }

  setEgresso(dado: any) {
    this.egressoSubject.next(dado);
  }

  getLastEgresso() {
    return this.egressoSubject.getValue(); // agora funciona!
  }

  clearEgresso() {
    this.egressoSubject.next(null);
  }
}
