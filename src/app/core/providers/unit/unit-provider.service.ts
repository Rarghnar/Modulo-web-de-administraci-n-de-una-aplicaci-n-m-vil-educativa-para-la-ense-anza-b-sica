import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Unit } from '../../models/unit.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UnitProviderService {

  constructor(private http: HttpService) { }
  
  public getAllUnit(): Observable<Unit[]> {
    return this.http.get<Unit[]>('/unit/all');
  }
  
  public getUnitById(id: string): Observable<Unit | null>{
    let path: string = '/unit/';
    return this.http.get<Unit>(path + id);
  }
  
  public addUnit(unit: Partial<Unit>) {
    return this.http.post<Unit>('/unit/', unit);
  }

  public async updateUnit(id: any, unit: any): Promise<any>{
    await this.http.patch<Unit>(`/unit/${id}`, unit).toPromise();
  }

  public deleteUnit(id: any): Observable<Unit>{
    return this.http.delete<Unit>(`/unit/${id}`);
  }
}
