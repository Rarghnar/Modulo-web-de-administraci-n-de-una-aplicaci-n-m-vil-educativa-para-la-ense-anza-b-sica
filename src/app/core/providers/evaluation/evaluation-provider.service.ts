import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http/http.service';
import { Observable } from 'rxjs';
import { Evaluation } from '../../models/evaluation.model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationProviderService {

  constructor(private http: HttpService) { }
  
  public getAllEvaluations(): Observable<Evaluation[]> {
    return this.http.get<Evaluation[]>('/evaluation/all');
  }
  
  public getEvaluationById(id: string): Observable<Evaluation | null>{
    let path: string = '/evaluation/';
    return this.http.get<Evaluation>(path + id);
  }
  
  public addEvaluation(evaluation: Partial<Evaluation>) {
    return this.http.post<Evaluation>('/evaluation/', evaluation);
  }

  public async updateEvaluation(id: any, evaluation: any): Promise<any>{
    await this.http.patch<Evaluation>(`/evaluation/${id}`, evaluation).toPromise();
  }

  public deleteEvaluation(id: any): Observable<Evaluation>{
    return this.http.delete<Evaluation>(`/evaluation/${id}`);
  }
}
