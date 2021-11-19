import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alternative } from '../../models/alternative.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AlternativeProviderService {

  constructor(private http: HttpService) { }
  
  public getAllAlternative(): Observable<Alternative[]> {
    return this.http.get<Alternative[]>('/alternative/all');
  }
  
  public getAlternativeById(id: string): Observable<Alternative | null>{
    let path: string = '/alternative/';
    return this.http.get<Alternative>(path + id);
  }
  
  public addAlternative(alternative: Partial<Alternative>) {
    return this.http.post<Alternative>('/alternative/', alternative);
  }

  public async updateAlternative(id: any, alternative: any): Promise<any>{
    await this.http.patch<Alternative>(`/alternative/${id}`, alternative).toPromise();
  }

  public deleteAlternative(id: any): Observable<Alternative>{
    return this.http.delete<Alternative>(`/alternative/${id}`);
  }
}
