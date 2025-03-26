import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICourse } from '../interfaces/course.interface'; 
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllCourses(page: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/curso`,  {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  getCourseById(id: number): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.API_URL}/curso/${id}`);
  }

  getCourseByName(page: number, size: number, name: string): Observable<any>  {

    return this.http.get<any>(`${this.API_URL}/curso/by-name/${name}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  getCourseByEgressoId(page: number, size: number, id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/curso/${id}/egressos`, {
      params: { page: page.toString(), size: size.toString() }
    });  
  }

  createCourse(course: any): Observable<ICourse> {
    return this.http.post<ICourse>(`${this.API_URL}/curso`, course);
  }

  updateCourse(course: ICourse): Observable<ICourse> {
    return this.http.put<ICourse>(`${this.API_URL}/curso`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/curso/totalDelete/${id}`);
  }
}
