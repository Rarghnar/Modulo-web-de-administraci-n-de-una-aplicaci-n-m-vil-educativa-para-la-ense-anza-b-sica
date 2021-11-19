import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../services/http/http.service';
import { Course } from '../../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseProviderService {

  constructor(private http: HttpService) { }
  
  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('/course/all');
  }
  
  public getCourseById(id: string): Observable<Course | null>{
    let path: string = '/course/';
    return this.http.get<Course>(path + id);
  }
  
  public addCourse(course: Partial<Course>) {
    return this.http.post<Course>('/course/', course);
  }
  
  public addCourseCascade(course: any){
    return this.http.post<Course>(`/course/addCourse`, course);
  }

  public async updateCourse(id: any, course: any): Promise<any>{
    await this.http.patch<Course>(`/course/${id}`, course).toPromise();
  }

  public async updateCourseCascade(id: any, course: any): Promise<any>{
    await this.http.patch<Course>(`/course/cascade/${id}`, course).toPromise();
  }

  public deleteCourse(id: any): Observable<Course>{
    return this.http.delete<Course>(`/course/${id}`);
  }

  public deleteCourseCascade(id: any): Observable<Course>{
    return this.http.delete<Course>(`/course/cascade/${id}`);
  }
}
