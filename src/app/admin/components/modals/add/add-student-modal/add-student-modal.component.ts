import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../../../core/services/form/form.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { StudentProviderService } from '../../../../../core/providers/student/student-provider.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Student } from 'src/app/core/models/student.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Course } from '../../../../../core/models/course.model';
import { CourseProviderService } from '../../../../../core/providers/course/course-provider.service';

@Component({
  selector: 'app-add-student-modal',
  templateUrl: './add-student-modal.component.html',
  styleUrls: ['./add-student-modal.component.css']
  
})
export class AddStudentModalComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public courseSelected:any;
  public dropdownSettings:IDropdownSettings = {};
  public courseList:Course[];
  public newCourseList:any[];
  public isLoad:boolean = false;
  public isLoadButton:boolean = false;
  /* public alumnsList: Student[]; */

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private studentProviderService: StudentProviderService,
    private courseProviderService: CourseProviderService,
    public activeModal: NgbActiveModal,
  ) {
      this.courseList = [];
      this.newCourseList = [];
   }

  ngOnInit(): void {
    this.checkoutForm;
    this.createFormGroup();
    this.getServiceData();
    this.dropdownSettings = {
      singleSelection: true,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar',
    };
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
    /* let listCourses:any = [];
    this.courseSelected.forEach((course) => {
      listCourses.push(course._id)
    })   */
    if ((this.checkoutForm.valid)) {
      let emailGenerate = (this.checkoutForm.get('names')?.value.trim()).toLowerCase();
      let letter = ((this.checkoutForm.get('lastNames')?.value.trim()).charAt(0)).toLowerCase();
      emailGenerate = emailGenerate.replace(/\s+/g, '.')+'.'+letter+'@mail.test.com';
      
      const studentData: Student = {
        names: this.checkoutForm.get('names')?.value.trim(),
        lastNames: this.checkoutForm.get('lastNames')?.value.trim(),
        rut: this.checkoutForm.get('rut')?.value.trim(),
        email: emailGenerate,
        course: this.courseSelected,
        /* courses: [''],
        subjects: [''], 
        teacher: 
        */
    };
      try {
        this.isLoadButton = true;
        await this.studentProviderService.addStudentCascade(studentData).toPromise();
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

  onItemSelect(item: any) {
  }
  onSelectAll(items: any) {
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
