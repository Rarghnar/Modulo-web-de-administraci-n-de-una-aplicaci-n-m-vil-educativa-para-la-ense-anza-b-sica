import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form/form.service';
import { Teacher } from '../../../../../core/models/teacher.model';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { TeacherProviderService } from '../../../../../core/providers/teacher/teacher-provider.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CourseProviderService } from '../../../../../core/providers/course/course-provider.service';
import { Course } from 'src/app/core/models/course.model';
import { AuthProviderService } from 'src/app/core/providers/auth/auth-provider.service';
import { SubjectProviderService } from 'src/app/core/providers/subject/subject-provider.service';

@Component({
  selector: 'admin-add-teacher-modal',
  templateUrl: './add-teacher-modal.component.html',
  styleUrls: ['./add-teacher-modal.component.css']
})
export class AddTeacherModalComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public courseSelected:any[];
  public courseBusySelected:any[];
  public subjectSelect:any[];
  public dropdownSettings:IDropdownSettings = {};
  public courseList:Course[];
  public newCourseList:any[];
  public newCourseListBusy:any[];
  public subjectsList:any[];
  public isLoad:boolean = false;
  public isBusyCourse:boolean = false;
  public isLoadButton:boolean = false;
  public emailGenerate:any;
  public emailLetter:any;

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private teacherProviderService: TeacherProviderService,
    private authProviderService: AuthProviderService,
    private courseProviderService: CourseProviderService,
    private subjectProviderService: SubjectProviderService,
    public activeModal: NgbActiveModal,
    ) {
      this.courseSelected = [];
      this.courseBusySelected = [];
      this.courseList = [];
      this.newCourseList = [];
      this.newCourseListBusy = [];
      this.subjectsList = [];
      this.subjectSelect = [];
  }
  
  ngOnInit(): void {
    this.checkoutForm;
    this.getServiceData();
    this.createFormGroup();
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
      /* email: new FormControl ('', [Validators.required]), */
      /* password: new FormControl ('', [Validators.required]), */
      /* courses: this.fb.array([]) */
    });
  }
  
  public async getServiceData() {
    try {
      this.courseList = await this.courseProviderService.getAllCourses().toPromise();
      this.subjectsList = await this.subjectProviderService.getAllSubject().toPromise();      
      this.isLoad = true;      
    } catch (error) {
      console.log(error);      
    }
  }
  
  public async onSubmit(form: FormGroupDirective): Promise<void> {      
    if ((this.checkoutForm.valid)) {
      let emailGenerate = (this.checkoutForm.get('names')?.value.trim()).toLowerCase();
      let letter = ((this.checkoutForm.get('lastNames')?.value.trim()).charAt(0)).toLowerCase();
      emailGenerate = emailGenerate.replace(/\s+/g, '.')+'.'+letter+'@mail.test.com';
      const teacherData: Teacher = {
        names: this.checkoutForm.get('names')?.value.trim(),
        lastNames: this.checkoutForm.get('lastNames')?.value.trim(),
        email: emailGenerate,
        rut: this.checkoutForm.get('rut')?.value.trim(),
        courses: this.isBusyCourse? this.courseBusySelected : this.courseSelected,
        subjects: this.subjectSelect,
        profession: this.checkoutForm.get('profession')?.value.trim(),
      };
      const adminData = {
        email: emailGenerate,
        password: teacherData.rut.replace('-',''),
        entity: 'Admin',
        username: this.checkoutForm.get('names')?.value.trim()+' '+ this.checkoutForm.get('lastNames')?.value.trim(),
        role: 'teacher'
      }         

      try {        
        this.isLoadButton = true;
        await this.authProviderService.addAdmin(adminData).toPromise();
        await this.teacherProviderService.addTeacherCascade(teacherData).toPromise();
        this.notificationService.success('Profesor agregado correctamente');
        this.activeModal.close('refresh')
        /* form.resetForm();
        this.checkoutForm.reset(); */
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
    this.newCourseList = []
    this.newCourseListBusy = []
    this.subjectSelect = subject;
    

    for (const subjectId of this.subjectSelect) {
      for (const course of this.courseList) {
        let courseSubjects:any = course.subjects;
        for (const subject of courseSubjects) {
          if (subjectId === subject._id) {
            let teacherSelect:any = course.teacher
            
            if (!teacherSelect) {
              let isRepeat = false;
              if (this.newCourseList.length === 0) {
                this.newCourseList.push(course)                
              } else {
                for (const courseId of this.newCourseList) {
                  if (courseId === course) {
                    isRepeat = true;
                  }
                }
                if (!isRepeat) {
                  this.newCourseList.push(course)                  
                }
              }
            }   
          }
        } 
      }      
    }

    for (const subjectId of this.subjectSelect) {
      for (const course of this.courseList) {
        let courseSubjects:any = course.subjects;
        for (const subject of courseSubjects) {
          if (subjectId === subject._id) {
            let teacherSelect:any = course.teacher
            if (teacherSelect) {
              let isRepeat = false;
              if (this.newCourseListBusy.length === 0) {
                this.newCourseListBusy.push(course)                
              } else {
                for (const courseId of this.newCourseListBusy) {
                  if (courseId === course) {                    
                    isRepeat = true;
                  }
                }
                if (!isRepeat) {
                  this.newCourseListBusy.push(course)                                   
                }
              }
            }   
          }
        } 
      }      
    }
  }

  public coursesSelected(courses: any) {
    this.courseSelected = courses;
    if (this.courseSelected) {
      if (this.courseSelected.length > 0) {
        this.checkoutForm.controls.courseWithTeacher.disable()      
      } else this.checkoutForm.controls.courseWithTeacher.enable()
    }   
    /* this.checkoutForm.controls.courseWithTeacher.disable() */
    this.isBusyCourse = false;
  }
  
  public coursesBusySelected(courses: any) {
    this.courseBusySelected = courses;
    if (this.courseBusySelected) {
      if (this.courseBusySelected.length > 0) {
        this.checkoutForm.controls.course.disable()      
      } else this.checkoutForm.controls.course.enable()   
    } 
    this.isBusyCourse = true;  
  }

  public namesSelected(names:any) {
    let letter = this.emailLetter?this.emailLetter:'';
    this.emailGenerate = (names.toLowerCase()).replace(/\s+/g, '.');

    document.querySelector<HTMLInputElement>('#email')!.value = (this.emailGenerate+'.'+letter+'@mail.test.com');  
  }

  public lastNameSelected(lastName:any) {
    this.emailLetter = (lastName.charAt(0)).toLowerCase();
    document.querySelector<HTMLInputElement>('#email')!.value = this.emailGenerate+'.'+this.emailLetter+'@mail.test.com';  
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
