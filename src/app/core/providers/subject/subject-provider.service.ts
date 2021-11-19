import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Subject } from '../../models/subject.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectProviderService {

  constructor(private httpService: HttpService) { }
  
  public getAllSubject(): Observable<Subject[]> {
    return this.httpService.get<Subject[]>('/subject/all');
  }
  
  public getSubjectById(id: string): Observable<Subject | null>{
    let path: string = '/subject/';
    return this.httpService.get<Subject>(path + id);
  }
  
  public addSubject(subject: Partial<Subject>) {
    return this.httpService.post<Subject>('/subject/', subject);
  }

  public async updateSubject(id: any, subject: any): Promise<any>{
    await this.httpService.patch<Subject>(`/subject/${id}`, subject).toPromise();
  }

  public deleteSubject(id: any): Observable<Subject>{
    return this.httpService.delete<Subject>(`/subject/${id}`);
  }

  
}
