import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { FormService } from 'src/app/core/services/form/form.service';
import { IsSuperadminService } from 'src/app/core/services/is-superadmin/is-superadmin.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CapitalizeAllPipe } from 'src/app/shared/pipes/capitalize-all/capitalize-all.pipe';
import { TokenService } from '../../../core/services/token/token.service';

@Component({
  selector: 'admin-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public isAdmin:boolean = false;
  public capitalizeAllPipe = new CapitalizeAllPipe();
  public showPass:boolean = false;

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private isSuperAdmin: IsSuperadminService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.checkoutForm;
    this.createFormGroup();    
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      email: new FormControl ('', [Validators.required, Validators.email, Validators.minLength(3)]),
      password: new FormControl ('', [Validators.required]),
    });
  }

  public async login(form: FormGroupDirective): Promise<void> {
    
    if(this.checkoutForm.valid){      
      try {
        await this.authService.login(this.checkoutForm.value).toPromise();  
        console.log(JSON.parse(this.tokenService.getToken()));
        let token = JSON.parse(this.tokenService.getToken());
        if (token.user.role === 'superadmin') {
          this.isSuperAdmin.sendMessage(true)          
        } else {
          this.isSuperAdmin.sendMessage(false)
        }
        this.notificationService.success('Bienvenido '+ this.capitalizeAllPipe.transform(token.user.username)); 
      } catch (error) {
        this.notificationService.error('Ocurrio un error, vuelva a intentarlo')        
      }
    }
  }

  public showPassword() {
    this.showPass = !this.showPass;
    const password = document.querySelector('#password');
    const type = password!.getAttribute('type') === 'password' ? 'text' : 'password';
    password!.setAttribute('type', type);
  }
  
  public controlIsRequired(formControlName: string): boolean {
    return this.formService.controlIsRequired(this.checkoutForm, formControlName);
  }

  public controlIsInvalid(formControlName: string): boolean {
    return this.formService.controlIsInvalid(this.checkoutForm, formControlName);
  }

  public controlIsInvalidEmail(formControlName: string): boolean {
    return this.formService.controlIsInvalidEmail(this.checkoutForm, formControlName);
  }

  public controlIsInvalidPattern(formControlName: string): boolean {
    return this.formService.controlIsInvalidPattern(this.checkoutForm, formControlName);
  }

  public controlIsInvalidLength(formControlName: string): boolean {
    return this.formService.controlIsInvalidLength(this.checkoutForm, formControlName);
  }
}
