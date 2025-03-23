import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { Course } from '../interfaces/course.interface'; // ajuste o caminho conforme necessário

@Injectable({ providedIn: 'root' })

export class ManageCourseService {
  private courseSubject = new BehaviorSubject<any | null>(null);

  course$ = this.courseSubject.asObservable();

  emitirCourse(dado: any) {
    this.courseSubject.next(dado);
  }

  setCourse(dados: any) {
    this.courseSubject.next(dados);
  }

  getLastCourse(): any | null {
    return this.courseSubject.getValue();
  }

  clearCourse() {
    this.courseSubject.next(null);
  }
}
