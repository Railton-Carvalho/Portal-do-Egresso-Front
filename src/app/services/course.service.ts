import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICourse } from '../interfaces/course.interface'; 
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly API_URL = 'https://api/course';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(this.API_URL);
  }

  getCourseById(id: number): Observable<ICourse> {
    return this.http.get<ICourse>(`${this.API_URL}/${id}`);
  }

  createCourse(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.API_URL, course);
  }

  updateCourse(course: ICourse): Observable<ICourse> {
    return this.http.put<ICourse>(`${this.API_URL}/${id}`, course);
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
