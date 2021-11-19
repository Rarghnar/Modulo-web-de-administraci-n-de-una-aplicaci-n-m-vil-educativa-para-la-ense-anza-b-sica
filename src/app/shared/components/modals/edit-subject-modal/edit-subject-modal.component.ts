import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroupDirective, FormGroup } from '@angular/forms';
import { Subject } from '../../../../core/models/subject.model';
import { CapitalizePipe } from '../../../pipes/capitalize/capitalize.pipe';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormService } from '../../../../core/services/form/form.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { SubjectProviderService } from '../../../../core/providers/subject/subject-provider.service';

@Component({
  selector: 'app-edit-subject-modal',
  templateUrl: './edit-subject-modal.component.html',
  styleUrls: ['./edit-subject-modal.component.css']
})
export class EditSubjectModalComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public subjectSelected!: any;
  public capitalizePipe = new CapitalizePipe();
  public isRefresh: boolean = false;  

  constructor(
    public activeModal: NgbActiveModal,
    private formService: FormService,
    private notificationService: NotificationService,
    private subjectProvider: SubjectProviderService,
    ) {
  }
  
  ngOnInit(): void {
    this.checkoutForm;
    this.createFormGroup();
    this.setCheckoutForm();
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      name: new FormControl ('', [Validators.required]),
    });
  }  

  public setCheckoutForm() {    
    this.checkoutForm.patchValue({
      name: this.capitalizePipe.transform(this.subjectSelected.name),
      grade: this.subjectSelected.grade
    })   
  }

  public async onSubmit(form: FormGroupDirective): Promise<void> {
    const idSelected = this.subjectSelected._id;
    if ((this.checkoutForm.valid)) {  
      const subjectData: Subject = {
        name: this.checkoutForm.get('name')?.value.trim(),
      };
      /* console.log(subjectData); */
      
      try {        
        this.subjectProvider.updateSubject(idSelected, subjectData);        
        this.notificationService.success('Curso editado correctamente');
        this.activeModal.close('refresh')
      } catch (error) {
        this.notificationService.error('Ocurrio un error, vuelva a intentarlo');
        console.log(error);        
      }      
    }
    else{
      this.notificationService.error('Campos sin rellenar')
    }
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

