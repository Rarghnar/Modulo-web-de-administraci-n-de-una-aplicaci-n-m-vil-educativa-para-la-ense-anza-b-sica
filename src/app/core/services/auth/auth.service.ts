import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Auth } from '../../models/auth.model';
import { HttpService } from '../http/http.service';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated: boolean;
  private currentUser: any;

  constructor(private router: Router, private httpService: HttpService, private tokenService: TokenService) {
    this.authenticated = false;
    this.currentUser = null;    

    if (localStorage.getItem('credentials')){
      this.authenticated = true;
    }    
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  login(auth: { email: string, password: string }): Observable<Auth> {
    return this.httpService.post('/auth/login', {
      email: auth.email,
      password: auth.password
    }).pipe(
      tap((data:any) => {
        if (data.entity === 'Admin') {
          const token: string = data.token;
          this.currentUser = { user: data.authenticated, entity: data.entity };
          const adminData = {role: this.currentUser.user.role, token: token, user: this.currentUser.user}
          this.tokenService.addToken(JSON.stringify(adminData));
          this.authenticated = true;
          console.log(this.currentUser);   
          if (this.currentUser.user.role === 'superadmin') {
            this.router.navigate(['admin/teachers']);   
          } else {
            this.router.navigate(['admin/alumns']);
          }
        }
      })
    )
  }

  public logout(): void{
    this.currentUser = null;
    this.authenticated = false;
    localStorage.removeItem('credentials');
    this.router.navigate(['admin/login']);
  }
}
