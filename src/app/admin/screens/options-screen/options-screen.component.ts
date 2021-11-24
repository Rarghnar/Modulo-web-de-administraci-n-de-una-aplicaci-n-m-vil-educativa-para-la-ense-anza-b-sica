import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { TeacherProviderService } from 'src/app/core/providers/teacher/teacher-provider.service';
import { FormService } from 'src/app/core/services/form/form.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { TokenService } from 'src/app/core/services/token/token.service';

@Component({
  selector: 'app-options-screen',
  templateUrl: './options-screen.component.html',
  styleUrls: ['./options-screen.component.css']
})
export class OptionsScreenComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public passUser: any;
  public errorCurrentPass: boolean;
  public errorRepeatPass: boolean;
  public errorNewPass: boolean;
  public userId:any;

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private teacherProviderService: TeacherProviderService,
    private tokenService: TokenService
  ) {
    this.passUser = 'asdf';
    this.errorCurrentPass = false;
    this.errorRepeatPass = false;
    this.errorNewPass = false;
  }

  ngOnInit(): void {
    this.checkoutForm;
    this.createFormGroup();
    this.userId = JSON.parse(this.tokenService.getToken()).user._id;    
  }

  createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      currentPass: new FormControl('',[Validators.required]),
      newPass: new FormControl('',[Validators.required]),
      repeatPass: new FormControl('',[Validators.required]),
    })
  }

  public async submitContact(event:any ,form: FormGroupDirective): Promise<void> {
    event.preventDefault();
    let currentPass: string = this.checkoutForm.value.currentPass;
    let newPass:string = this.checkoutForm.value.newPass;
    let repeatPass:string = this.checkoutForm.value.repeatPass;
    const currentPassword:any = {
      password: currentPass
    }
       
    let password: any = await this.teacherProviderService.verificatePassword(this.userId, currentPassword).toPromise();    

    if (this.checkoutForm.valid) {
      if (password) {
        this.errorCurrentPass = false;
        if (currentPass !== newPass) {
          this.errorNewPass = false;
          if (newPass === repeatPass) {  
            this.errorRepeatPass = false;    
            const newPassword: any = {
              password: newPass
            }     
            try {
              await this.teacherProviderService.changePassword(this.userId, newPassword).toPromise();
              this.notificationService.success('La contraseña se ha cambiado exitosamente');
              form.resetForm();
              this.checkoutForm.reset();
            } catch (error) {
              console.log(error);
              this.notificationService.error('No se ha podido cambiar la contraseña')
            }         
          } else {
            this.errorRepeatPass = true
            this.notificationService.error('Las contraseñas no son iguales') 
          }  
        } else {
          this.errorNewPass = true;
          this.notificationService.error('La contraseña nueva no debe ser la misma que la actual') 
        }        
      } else {
        this.errorCurrentPass = true;
        this.notificationService.error('Contraseña actual incorrecta')
      }       
    }

    /* if(this.checkoutForm.valid) {
      if (this.checkoutForm.value.currentPass == this.passUser) {
        this.errorCurrentPass = false;
        if(this.checkoutForm.value.newPass == this.checkoutForm.value.repeatPass) {
          this.errorRepeatPass = false;
          
          this.notificationService.success('Contraseña cambiada con exito');
          form.resetForm()
          this.checkoutForm.reset()
        } else {
          this.errorRepeatPass = true;
          this.notificationService.error('La contraseña no es identica')
        }
      } else {
        this.errorCurrentPass = true;
        this.notificationService.error('Contraseña actual incorrecta')        
      }     
    } else { 
    } */
  }

  public controlIsRequired(formControlName: string): boolean {
    return this.formService.controlIsRequired(this.checkoutForm, formControlName);
  }

  public controlIsInvalid(formControlName: string): boolean {
    return this.formService.controlIsInvalid(this.checkoutForm, formControlName);
  }

  public isCurrentPassword(formControlName: string): boolean {
    if(this.checkoutForm.value.currentPass == this.passUser) {      
      return true
    } else {
      return this.formService.controlIsInvalidCurrentPass(this.checkoutForm, formControlName);
    }
  }

}
