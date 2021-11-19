import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from '../../models/lesson.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LessonProviderService {

  constructor(private http: HttpService) { }
  
  public getAllLesson(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>('/lesson/all');
  }
  
  public getLessonById(id: string): Observable<Lesson | null>{
    let path: string = '/lesson/';
    return this.http.get<Lesson>(path + id);
  }
  
  public addLesson(lesson: Partial<Lesson>) {
    return this.http.post<Lesson>('/lesson/', lesson);
  }

  public async updateLesson(id: any, lesson: any): Promise<any>{
    await this.http.patch<Lesson>(`/lesson/${id}`, lesson).toPromise();
  }

  public async addEvaluationLesson(id: any, lesson: any): Promise<any>{
    await this.http.patch<Lesson>(`/lesson/evaluation/${id}`, lesson).toPromise();
  }

  public async deleteEvaluationLesson(id: any, lesson: any): Promise<any>{
    await this.http.patch<Lesson>(`/lesson/delete-evaluation/${id}`, lesson).toPromise();
  }

  public deleteLesson(id: any): Observable<Lesson>{
    return this.http.delete<Lesson>(`/lesson/${id}`);
  }
}
