import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnsService {
  public id!: string

  constructor() { }
  
  public getIdAlumn(id: string){
    this.id = id;
  }
  public sendIdAlumn(): string{
    return this.id
  }
}
