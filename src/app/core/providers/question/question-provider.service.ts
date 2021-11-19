import { Injectable } from '@angular/core';
import { Question } from '../../models/question.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionProviderService {

  constructor(private http: HttpService) { }
  
  public addImage(image: FormData) {
    return this.http.post<any>('/question/image', image);
  }

  /* public async updateQuestion(id: any, Question: any): Promise<any>{
    await this.http.patch<Question>(`/question/${id}/image`, Question).toPromise();
  } */

}