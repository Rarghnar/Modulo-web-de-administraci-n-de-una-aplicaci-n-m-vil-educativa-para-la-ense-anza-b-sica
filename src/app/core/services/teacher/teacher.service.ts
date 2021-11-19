import { Injectable } from '@angular/core';
import { Teacher } from '../../models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  public id!: string

  constructor() { }
  
  public getIdTeacher(id: string){
    this.id = id;
  }
  public sendIdTeacher(): string{
    return this.id
  }
}
