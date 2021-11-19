import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, FormGroup } from '@angular/forms';
import { Subject } from '../../../../../core/models/subject.model';
import { FormService } from '../../../../../core/services/form/form.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SubjectProviderService } from '../../../../../core/providers/subject/subject-provider.service';

@Component({
  selector: 'app-add-subject-modal',
  templateUrl: './add-subject-modal.component.html',
  styleUrls: ['./add-subject-modal.component.css']
})
export class AddSubjectModalComponent implements OnInit {

  public checkoutForm!: FormGroup;

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private subjectProvider: SubjectProviderService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.checkoutForm;
    this.createFormGroup();
    /* this.getServiceData(); */
  }

  public async onSubmit(form: FormGroupDirective): Promise<void> {
    if ((this.checkoutForm.valid)) {
     const subjectData: Subject = {
       name: this.checkoutForm.get('name')?.value.trim(),
      /*  teacher:
       units */

     };
     try {
       console.log(subjectData);
       await this.subjectProvider.addSubject(subjectData).toPromise();
       
       this.notificationService.success('Asignatura agregada correctamente');
       this.activeModal.close('refresh')
       form.resetForm();
       this.checkoutForm.reset();
     } catch (error) {
       this.notificationService.error('Ocurrio un error, vuelva a intentarlo');
       console.log(error);        
     }      
   }
   else{
     this.notificationService.error('Campos sin rellenar')
   }
 }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      name: new FormControl ('', [Validators.required]),
    });
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