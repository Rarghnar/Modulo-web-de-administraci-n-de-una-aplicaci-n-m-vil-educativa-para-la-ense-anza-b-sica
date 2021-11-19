import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from '../../models/teacher.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherProviderService {

  constructor(private http: HttpService) { }
  
  public getAllTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>('/teacher/all');
  }
  
  public getTeacherById(id: string): Observable<Teacher | null>{
    let path: string = '/teacher/';
    return this.http.get<Teacher>(path + id);
  }
  
  public addTeacher(teacher: Partial<Teacher>) {
    return this.http.post<Teacher>('/teacher/', teacher);
  }

  public addTeacherCascade(teacher: Partial<Teacher>) {
    return this.http.post<Teacher>('/teacher/cascade/', teacher);
  }

  public async updateTeacher(id: any, teacher: any): Promise<any>{
    await this.http.patch<Teacher>(`/teacher/${id}`, teacher).toPromise();
  }

  public async updateTeacherCascade(id: any, teacher: any): Promise<any>{
    await this.http.patch<Teacher>(`/teacher/cascade/${id}`, teacher).toPromise();
  }

  public verificatePassword(id: string, password: any): Observable<Teacher> {
    return this.http.post<Teacher>(`/teacher/${id}/verificate-password`,password)
  }

  public changePassword(id: string, newPassword: any): Observable<Teacher> {
    return this.http.patch<Teacher>(`/teacher/${id}/change-password`, newPassword)
  }

  public deleteTeacher(id: any): Observable<Teacher>{
    return this.http.delete<Teacher>(`/teacher/${id}`);
  }

  public deleteTeacherCascade(id: any): Observable<Teacher>{
    return this.http.delete<Teacher>(`/teacher/cascade/${id}`);
  }

}
