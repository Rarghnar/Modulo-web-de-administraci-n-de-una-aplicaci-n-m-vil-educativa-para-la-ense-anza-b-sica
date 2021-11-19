import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsSuperadminService {

  private message = new ReplaySubject<boolean>()
  
  public get getMessage() {
    return this.message.asObservable()
  }

  public sendMessage(id: boolean): void {
    this.message.next(id);
  }

  constructor() { }
}
