import { Injectable } from '@angular/core';
import { Auth } from '../../models/auth.model';
import { HttpService } from '../../services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthProviderService {

  constructor(private http: HttpService) { }

  public addAdmin(auth: Partial<Auth>) {
    return this.http.post<Auth>('/auth/admin/signin/', auth);
  }
}
