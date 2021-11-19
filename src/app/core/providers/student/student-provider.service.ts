import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class StudentProviderService {

  constructor(private http: HttpService) { }
  
  public getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('/user/all');
  }
  
  public getStudentById(id: string): Observable<Student | null>{
    let path: string = '/user/';
    return this.http.get<Student>(path + id);
  }
  
  public addStudent(user: Partial<Student>) {
    return this.http.post<Student>('/user/', user);
  }

  public addStudentCascade(user: Partial<Student>) {
    return this.http.post<Student>('/user/cascade', user);
  }

  public async updateStudent(id: any, user: any): Promise<any>{
    await this.http.patch<Student>(`/user/${id}`, user).toPromise();
  }

  public async updateStudentCascade(id: any, user: any): Promise<any>{
    await this.http.patch<Student>(`/user/cascade/${id}`, user).toPromise();
  }

  public deleteStudent(id: any): Observable<Student>{
    return this.http.delete<Student>(`/user/${id}`);
  }

  public deleteStudentCourse(id: any): Observable<Student>{
    return this.http.delete<Student>(`/user/cascade/${id}`);
  }
}
