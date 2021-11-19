import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form/form.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/core/models/course.model';
import { Teacher } from 'src/app/core/models/teacher.model';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'src/app/core/models/subject.model';
import { Student } from 'src/app/core/models/student.model';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize/capitalize.pipe';
import { CapitalizeAllPipe } from 'src/app/shared/pipes/capitalize-all/capitalize-all.pipe';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { CourseProviderService } from 'src/app/core/providers/course/course-provider.service';
import { SubjectProviderService } from 'src/app/core/providers/subject/subject-provider.service';
import { StudentProviderService } from 'src/app/core/providers/student/student-provider.service';
import { TeacherProviderService } from 'src/app/core/providers/teacher/teacher-provider.service';

@Component({
  selector: 'shared-edit-course-modal',
  templateUrl: './edit-course-modal.component.html',
  styleUrls: ['./edit-course-modal.component.css']
})
export class EditCourseModalComponent implements OnInit {
  public courseSelected!: any;
  public checkoutForm!: FormGroup;
  public studentAll: Student[];
  public studentAllFilter: Student[];
  public teacherAll:Teacher[];
  public subjectAll:Subject[];
  public subjectsFilterGrade:Subject[];
  public newAlumnList:any[];
  public teacherSelected:any;
  public studentSelected:any[];
  public subjectSelected:any[];

  public isLoad:boolean = false;
  public isEmpty:boolean = false;
  public isLoadButton:boolean = false;
  public capitalizePipe = new CapitalizePipe();
  public capitalizeAllPipe = new CapitalizeAllPipe();

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private courseProviderService: CourseProviderService,
    public activeModal: NgbActiveModal,
    private subjectProviderService: SubjectProviderService,
    private studentProviderService: StudentProviderService,
    private teacherProviderService: TeacherProviderService,
    private config: NgSelectConfig,
    ) {
      this.studentAll = [];
      this.studentAllFilter = [];
      this.teacherAll = [];
      this.subjectAll = [];
      this.subjectsFilterGrade = [];
      this.newAlumnList = [];
      this.studentSelected = [];
      this.subjectSelected = [];
  }
  
  ngOnInit(): void {    
    this.checkoutForm;
    this.createFormGroup();
    this.getServiceData();
    this.setCheckoutForm();
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      name: new FormControl ('', [Validators.required]),
      grade: new FormControl ('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      teacher: new FormControl ('', [Validators.required]),
      student: new FormControl ('',),
      subject: new FormControl ('', [Validators.required]),
    });
  }
  
  public async getServiceData() {
    try {
      this.teacherAll = await this.teacherProviderService.getAllTeachers().toPromise();      
      this.studentAll = await this.studentProviderService.getAllStudents().toPromise();      
      this.subjectAll = await this.subjectProviderService.getAllSubject().toPromise();  
      let grade = this.courseSelected.grade;
      let gradeToFind = grade+'°';

      this.subjectsFilterGrade = [];
      for (const subject of this.subjectAll) {
        let subjectName = subject.name;
        if (subjectName.indexOf(gradeToFind) !== -1) {
          this.subjectsFilterGrade.push(subject)        
        }
      }
      
      
      for (const student of this.courseSelected.students) {
        this.studentAllFilter.push(student)
      }

      for (const student of this.studentAll) {      
        if ((student.course?.length === 0)) {          
          this.studentAllFilter.push(student);
          this.isEmpty = false;
        }
      }
      
      this.isLoad = true;
    } catch (error) {
      console.log(error);
    }
  }

  public setCheckoutForm() {
    let arrayStudent:any = [];
    let arraySubject:any = [];
    for (const student of this.courseSelected.students) {
      arrayStudent.push(student._id)        
    }    
    for (const iterator of this.courseSelected.subjects) {
      arraySubject.push(iterator._id)
    }
    this.checkoutForm.patchValue({
      name: this.capitalizeAllPipe.transform(this.courseSelected.name),
      grade: this.courseSelected.grade,
      teacher: this.courseSelected.teacher? this.courseSelected.teacher._id: '',
      student: arrayStudent? arrayStudent: [],
      subject: arraySubject? arraySubject: [],
    })   
    this.studentSelected = arrayStudent;
    this.subjectSelected = arraySubject;
    this.teacherSelected = this.courseSelected.teacher? this.courseSelected.teacher._id: '';
    if (this.studentSelected.length === 0) {
      this.isEmpty = true;
    }
    /* this.studentSelected.push('61804f2d7daf5521387a098a') */
  }

  public selectedTeacher(event:any) {
    this.teacherSelected = event;
  }

  public selectedStudent(event:any) {
    this.studentSelected = event;    
  }

  public selectedSubject(event:any) {
    this.subjectSelected = event;      
  }

  public selectedGrade(grade:any) {    
    let gradeToFind = grade+'°';
    this.subjectSelected = [];
    this.checkoutForm.patchValue({
      subject: [],
    })
    
    this.subjectsFilterGrade = [];
    for (const subject of this.subjectAll) {
      let subjectName = subject.name;
      if (subjectName.indexOf(gradeToFind) !== -1) {
        this.subjectsFilterGrade.push(subject)        
      }
    } 
  }

  public async onSubmit(form: FormGroupDirective): Promise<void> {
    if ((this.checkoutForm.valid)) {
      /* const courses = this.checkoutForm.get('courses')?.value; */
      const courseData: Course = {
        name: this.checkoutForm.get('name')?.value,
        grade: this.checkoutForm.get('grade')?.value,
        students: this.studentSelected,
        subjects: this.subjectSelected,
        teacher: this.teacherSelected
      };
      try {
        this.isLoadButton = true;
        await this.courseProviderService.updateCourseCascade(this.courseSelected._id,courseData)
        this.activeModal.close('refresh')
        form.resetForm();
        this.checkoutForm.reset();
        this.notificationService.success('Curso editado correctamente');
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
