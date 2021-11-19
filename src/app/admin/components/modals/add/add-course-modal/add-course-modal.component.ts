import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form/form.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from 'src/app/core/models/course.model';
import { CourseProviderService } from '../../../../../core/providers/course/course-provider.service';
import { Student } from '../../../../../core/models/student.model';
import { CapitalizePipe } from '../../../../../shared/pipes/capitalize/capitalize.pipe';
import { SubjectProviderService } from '../../../../../core/providers/subject/subject-provider.service';
import { StudentProviderService } from '../../../../../core/providers/student/student-provider.service';
import { TeacherProviderService } from '../../../../../core/providers/teacher/teacher-provider.service';
import { Teacher } from 'src/app/core/models/teacher.model';
import { NgSelectConfig } from '@ng-select/ng-select';
import { Subject } from 'src/app/core/models/subject.model';


@Component({
  selector: 'admin-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.css']
})
export class AddCourseModalComponent implements OnInit {

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
  public isLoadButton:boolean = false;


  public isLoad:boolean = false;
  public isEmpty:boolean = true;

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private courseProviderService: CourseProviderService,
    public activeModal: NgbActiveModal,
    private subjectProviderService: SubjectProviderService,
    private studentProviderService: StudentProviderService,
    private teacherProviderService: TeacherProviderService,
    private config: NgSelectConfig
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

      for (const student of this.studentAll) {
        if ((student.course?.length === 0) || (student.course === null)) {
          this.studentAllFilter.push(student);
          this.isEmpty = false;
        }
      }      

      this.isLoad = true;
    } catch (error) {
      console.log(error);
    }
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
      this.isLoadButton = true;
      const courseData: Course = {
        name: this.checkoutForm.get('name')?.value.trim(),
        grade: this.checkoutForm.get('grade')?.value,
        students: this.studentSelected,
        subjects: this.subjectSelected,
        teacher: this.teacherSelected
      };
      try {
        await this.courseProviderService.addCourseCascade(courseData).toPromise();        
        this.activeModal.close('refresh')
        this.checkoutForm.reset();
        form.resetForm();
        this.notificationService.success('Curso agregador correctamente');
        this.isLoadButton = true;
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
