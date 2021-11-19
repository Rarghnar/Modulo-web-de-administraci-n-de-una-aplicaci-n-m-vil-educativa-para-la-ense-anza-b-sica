import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvaluationRecord } from '../../models/evaluation-record.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class EvaluationRecordProviderService {

  constructor(private http: HttpService) { }
  
  public getAllEvaluationsRecord(): Observable<EvaluationRecord[]> {
    return this.http.get<EvaluationRecord[]>('/evaluation-record/all');
  }
  
  public getEvaluationRecordById(id: string): Observable<EvaluationRecord | null>{
    let path: string = '/evaluation-record/';
    return this.http.get<EvaluationRecord>(path + id);
  }
  
  public addEvaluationRecord(evaRecord: Partial<EvaluationRecord>) {
    return this.http.post<EvaluationRecord>('/evaluation-record/', evaRecord);
  }

  public async updateEvaluationRecord(id: any, evaRecord: any): Promise<any>{
    await this.http.patch<EvaluationRecord>(`/evaluation-record/${id}`, evaRecord).toPromise();
  }

  public deleteEvaluationRecord(id: any): Observable<EvaluationRecord>{
    return this.http.delete<EvaluationRecord>(`/evaluation-record/${id}`);
  }
}
