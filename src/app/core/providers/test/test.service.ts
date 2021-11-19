import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Test } from '../../models/test.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private httpService: HttpService) { }

  public getAllTest(): Observable<Test[]> {
    return this.httpService.get<Test[]>('/test/all');
  }
  
  public getTestById(id: string): Observable<Test | null>{
    let path: string = '/test/';
    return this.httpService.get<Test>(path + id);
  }
  
  public addTest(test: Partial<Test>) {
    return this.httpService.post<Test>('/test/add', test);
  }

  public deleteTest(test: any): Observable<Test>{
    return this.httpService.post<Test>('/test/delete', test);
  }

  public patchTest(test: any): Partial<Observable<Test>>{
    return this.httpService.patch<Test>('/test/patch', test);
  }
}
