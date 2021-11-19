import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormService } from '../../../../core/services/form/form.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { StudentProviderService } from '../../../../core/providers/student/student-provider.service';
import { Student } from '../../../../core/models/student.model';
import { CourseProviderService } from 'src/app/core/providers/course/course-provider.service';
import { Course } from 'src/app/core/models/course.model';
import { CapitalizeAllPipe } from 'src/app/shared/pipes/capitalize-all/capitalize-all.pipe';

@Component({
  selector: 'app-edit-student-modal',
  templateUrl: './edit-student-modal.component.html',
  styleUrls: ['./edit-student-modal.component.css']
})
export class EditStudentModalComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public studentSelected:any;
  public courseSelected:any;
  public courseList:Course[];
  public newCourseList:any[];
  public isLoad:boolean = false;
  public isLoadButton:boolean = false;
  public capitalizeAllPipe = new CapitalizeAllPipe();
  /* public alumnsList: Student[]; */

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private studentProviderService: StudentProviderService,
    private courseProviderService: CourseProviderService,
    public activeModal: NgbActiveModal
  ) {
      this.courseList = [];
      this.newCourseList = [];
   }

  ngOnInit(): void {  
    this.checkoutForm;
    this.createFormGroup();
    this.getServiceData();
    this.setCheckoutForm();
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      names: new FormControl ('', [Validators.required]),
      lastNames: new FormControl ('', [Validators.required]),
      rut: new FormControl ('', [Validators.required]), 
      course: new FormControl ('',),
      /* email: new FormControl ('', [Validators.required]), */
    });
  }

  public setCheckoutForm() {
    this.courseSelected = this.studentSelected.course[0]? this.studentSelected.course[0]._id: undefined
    this.checkoutForm.patchValue({
      names: this.capitalizeAllPipe.transform(this.studentSelected.names),
      lastNames: this.capitalizeAllPipe.transform(this.studentSelected.lastNames),
      rut: this.studentSelected.rut, 
      course: this.courseSelected,
    })
  }

  public async getServiceData() {
    try {
      this.courseList = await this.courseProviderService.getAllCourses().toPromise();
      for (let i = 0; i < this.courseList.length; i++) {
        const course = {
          name: this.courseList[i].name,
          _id: this.courseList[i]._id
        }
        this.newCourseList.push(course)     
           
      }
      this.isLoad = true;    
    } catch (error) {
      console.log(error);      
    }
  }

  public async onSubmit(form: FormGroupDirective): Promise<void> {
    if ((this.checkoutForm.valid)) {
      /* let emailGenerate = (this.checkoutForm.get('names')?.value.trim()).toLowerCase();
      let letter = ((this.checkoutForm.get('lastNames')?.value.trim()).charAt(0)).toLowerCase();
      emailGenerate = emailGenerate.replace(/\s+/g, '.')+'.'+letter+'@mail.test.com'; */
      
      const studentData: Partial<Student> = {
        names: this.checkoutForm.get('names')?.value.trim(),
        lastNames: this.checkoutForm.get('lastNames')?.value.trim(),
        rut: this.checkoutForm.get('rut')?.value.trim(),
        course: this.courseSelected,
        /* email: emailGenerate, */
    };
      try {
        this.isLoadButton = true;
        await this.studentProviderService.updateStudentCascade(this.studentSelected._id,studentData);
        this.notificationService.success('Estudiante agregado correctamente');
        this.activeModal.close('refresh')
        form.resetForm();
        this.checkoutForm.reset();
        this.isLoadButton = false;
      } catch (error) {
        this.isLoadButton = false;
        this.notificationService.error('Ocurrio un error, vuelva a intentarlo');
        console.log(error);        
      }      
   }
   else{
     this.notificationService.error('Campos sin rellenar')
   }
 }

  public coursesSelected(courses: any) {
    this.courseSelected = courses;   
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
