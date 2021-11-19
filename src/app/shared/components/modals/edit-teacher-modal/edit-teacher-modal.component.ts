import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Teacher } from 'src/app/core/models/teacher.model';
import { TeacherProviderService } from 'src/app/core/providers/teacher/teacher-provider.service';
import { FormService } from 'src/app/core/services/form/form.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize/capitalize.pipe'
import { CapitalizeAllPipe } from 'src/app/shared/pipes/capitalize-all/capitalize-all.pipe'
import { CourseProviderService } from 'src/app/core/providers/course/course-provider.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Course } from 'src/app/core/models/course.model';
import { SubjectProviderService } from 'src/app/core/providers/subject/subject-provider.service';

@Component({
  selector: 'shared-edit-teacher-modal',
  templateUrl: './edit-teacher-modal.component.html',
  styleUrls: ['./edit-teacher-modal.component.css']
})
export class EditTeacherModalComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public teacherSelected!: any;
  public capitalizePipe = new CapitalizePipe();
  public capitalizeAllPipe = new CapitalizeAllPipe();
  public isRefresh: boolean = false;
  public courseSelected:any[];
  public courseBusySelected:any[];
  public subjectSelect:any[];
  public dropdownSettings:IDropdownSettings = {};
  public courseList:Course[];
  public newCourseList:any[];
  public newCourseListBusy:any[];
  public subjectsList:any[];
  public isLoad:boolean = false;
  public isBusyCourse:boolean = true;
  public isLoadButton:boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private formService: FormService,
    private notificationService: NotificationService,
    private teacherProviderService: TeacherProviderService ,
    private courseProviderService: CourseProviderService,
    private subjectProviderService: SubjectProviderService
    ) { 
      this.courseSelected = [];
      this.courseBusySelected = [];
      this.newCourseList = [];
      this.subjectsList = [];
      this.subjectSelect = [];
      this.courseList = [];
      this.newCourseListBusy = [];
  }

  ngOnInit(): void {    
    this.checkoutForm;
    
    this.getDataServices();
    this.createFormGroup();
    this.setCheckoutForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'name',
      selectAllText: 'Seleccionar todos',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Buscar',
    };
    /* console.log(this.teacherSelected);   */  
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      names: new FormControl ('', [Validators.required]),
      lastNames: new FormControl ('', [Validators.required]),
      rut: new FormControl ('', [Validators.required]),
      profession: new FormControl ('', [Validators.required]),
      course: new FormControl ('',),
      courseWithTeacher: new FormControl ('',),
      subject: new FormControl ('', [Validators.required]),
    });
  } 

  public setCheckoutForm() {
    let arrayCourse = [];
    for (const course of this.teacherSelected.courses) {
      arrayCourse.push(course._id)
    }

    let arraySubjets = [];
    for (const subject of this.teacherSelected.subjects) {
      arraySubjets.push(subject._id)
    }
    
    this.checkoutForm.patchValue({
      names:  this.capitalizeAllPipe.transform(this.teacherSelected.names),
      lastNames: this.capitalizeAllPipe.transform(this.teacherSelected.lastNames),
      rut: this.teacherSelected.rut,
      profession: this.capitalizePipe.transform(this.teacherSelected.profession),
      courseWithTeacher: arrayCourse,
      subject: arraySubjets
    })

    this.courseBusySelected = arrayCourse;
    this.subjectSelect = arraySubjets;
    

  }

  public async getDataServices() {
    try {
      this.courseList = await this.courseProviderService.getAllCourses().toPromise();
      this.subjectsList = await this.subjectProviderService.getAllSubject().toPromise();
      for (const course of this.courseList) {
        let teacherSelect:any = course.teacher
        if (!teacherSelect) {
          /* console.log(course.name); */          
          this.newCourseList.push(course)
        }
      }

      for (const course of this.courseList) {
        let teacherSelect:any = course.teacher
        if (teacherSelect) {
          this.newCourseListBusy.push(course)
          /* console.log(course.name); */          
        }
      }
      this.isLoad = true;      
    } catch (error) {
      console.log(error);      
    }
  }

  public async onSubmit(form: FormGroupDirective): Promise<void> {
    const idSelected = this.teacherSelected._id;
    if ((this.checkoutForm.valid)) {
     /* const courses = this.checkoutForm.get('courses')?.value; */
     const teacherData: Partial<Teacher> = {
      names: this.checkoutForm.get('names')?.value.trim(),
      lastNames: this.checkoutForm.get('lastNames')?.value.trim(),
      rut: this.checkoutForm.get('rut')?.value.trim(),
      courses: this.isBusyCourse? this.courseBusySelected : this.courseSelected,
      subjects: this.subjectSelect,
      profession: this.checkoutForm.get('profession')?.value.trim(),
     };          
     
     try {
       this.isLoadButton = true;
       this.teacherProviderService.updateTeacherCascade(idSelected, teacherData);
       this.notificationService.success('Profesor editado correctamente');
       this.activeModal.close('refresh');
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

public subjectSelected(subject:any) {
  this.subjectSelect = subject;
}

public coursesSelected(courses: any) {
  this.courseSelected = courses;   
  if (this.courseSelected.length > 0) {
    this.checkoutForm.controls.courseWithTeacher.disable()      
  } else this.checkoutForm.controls.courseWithTeacher.enable() 
  /* this.checkoutForm.controls.courseWithTeacher.disable() */
  this.isBusyCourse = false;
}

public coursesBusySelected(courses: any) {
  this.courseBusySelected = courses; 
  if (this.courseBusySelected.length > 0) {
    this.checkoutForm.controls.course.disable()      
  } else this.checkoutForm.controls.course.enable()   
  this.isBusyCourse = true;
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
