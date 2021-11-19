import { Component, OnInit } from '@angular/core';
import { info } from 'src/app/core/base-info';
import { Course } from 'src/app/core/models/course.model';
import { CourseProviderService } from '../../../core/providers/course/course-provider.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddCourseModalComponent } from '../../components/modals/add/add-course-modal/add-course-modal.component';
import { AddEvaluationModalComponent } from '../../components/modals/add/add-evaluation-modal/add-evaluation-modal.component'
import { LessonProviderService } from 'src/app/core/providers/lesson/lesson-provider.service';
import { Lesson } from 'src/app/core/models/lesson.model';
import { IsSuperadminService } from '../../../core/services/is-superadmin/is-superadmin.service';
import { TokenService } from '../../../core/services/token/token.service';
import { StudentProviderService } from 'src/app/core/providers/student/student-provider.service';
import { Student } from 'src/app/core/models/student.model';

@Component({
  selector: 'app-courses-screen',
  templateUrl: './courses-screen.component.html',
  styleUrls: ['./courses-screen.component.css']
})
export class CoursesScreenComponent implements OnInit {

  public infoSelect: any[];
  public textInput!: string;
  public textFilter!: string;
  public isFirstLoad: boolean = true;

  public courseData: Course[];
  public lessonData: Lesson[];
  public studentData: Student[];
  public listSubjects: any[];
  public courseSelected: any[];
  public isLoad: boolean = false;
  public isAdmin: any = false;
  public isLoadSelected: boolean = false;
  public optionSubject: any;
  public idSubjectSelected: any;
  public isFirstData: boolean = false;
  public isSubject: boolean = false;

  constructor(
    private courseProvider: CourseProviderService, 
    private lessonProvider: LessonProviderService,
    private studentProviderService: StudentProviderService,
    private modalService: NgbModal,
    private configModal: NgbModalConfig,
    private isSuperAdmin: IsSuperadminService,
    private tokenService: TokenService
    ) {
    this.courseData = [];
    this.lessonData = [];
    this.studentData = [];
    this.listSubjects = [];
    this.courseSelected = [];
    this.configModal.backdrop = 'static';

    this.infoSelect = [];
  }

  async ngOnInit(): Promise<void> {
    if (JSON.parse(this.tokenService.getToken()).role === 'superadmin') {
      this.isAdmin = true          
    } else this.isAdmin = false;
    this.getLesson();
    this.getCourse();
  }

  public async getLesson() {
    try {
      this.lessonData = await this.lessonProvider.getAllLesson().toPromise();      
    } catch (error) {
      console.log(error)
    }
  }

  public async getCourse() {
    try {
      this.isLoad = false;
      this.courseData = await this.courseProvider.getAllCourses().toPromise();   
      this.studentData = await this.studentProviderService.getAllStudents().toPromise();
      this.isLoad = true;               
    } catch (error) {
      console.log(error);      
    }  
  }

  
  selectCourse(event:any) {
    this.isFirstLoad = false;
    this.isSubject = false;
    this.idSubjectSelected = {};
    
    if (event.subjects.length > 0) this.isSubject = true

    if (this.isFirstData) {
      if (event.subjects.length > 0) this.optionSubject = event.subjects[0].name
      else this.optionSubject = ''; 
      this.isFirstData = false     
    }
    
    this.courseSelected = event;
    let listEvaluations:any[] = [];
    this.infoSelect = [];
    this.listSubjects = event.subjects;
    
    event.subjects.forEach((subject:any) => {
      if (subject.name == this.optionSubject) {     
        this.idSubjectSelected = subject;
        subject.units.forEach((unit:any) => {
          listEvaluations = [];        
          unit.lessons.forEach((lesson:any) => {
            let markStudent = [];
            let lowMarkCurrent = 70;
            let topMarkCurrent = 0;
            let isMark = false;
            let average = 0;
            let data = this.lessonData.find((lessonData:any)=>lessonData._id == lesson);
            const evaluationGet:any = data!.evaluation;
            for (const student of this.studentData) {
              const studentCurrent:any = student;
              for (const evaRecord of studentCurrent.evaluationsRecords) {
                if (evaluationGet) {
                  if (evaRecord.evaluation === evaluationGet._id) {
                    if (evaRecord.mark < lowMarkCurrent) {
                      lowMarkCurrent = evaRecord.mark;
                      isMark = true;
                    }
                    if (evaRecord.mark > topMarkCurrent) {
                      topMarkCurrent = evaRecord.mark;
                    }
                    markStudent.push(evaRecord.mark)
                  }                  
                }
              }
            }
            if (markStudent) {
              for (const mark of markStudent) {
                average = average + mark
              }
              average = Math.round(((average/markStudent.length)*100)/100);    
            }
            if (data?.evaluation) {
              const evaluation = {
                unitName: unit.name,
                lessonName: data?.name,
                evaluations: data?.evaluation,
                idLesson: data?._id,
                idUnit: unit._id,
                nameSubject: subject.name,
                averageMark: average,
                lowMark: isMark? lowMarkCurrent: 'N/E',
                topMark: isMark? topMarkCurrent: 'N/E',
              }            
              listEvaluations.push(evaluation);            
              let isRepeat:boolean = false;
              
              listEvaluations.forEach((info:any) => {
                if (info._id === evaluation.idLesson) {                
                  isRepeat = true;              
                }
              })
              if (!isRepeat) {
                this.infoSelect.push(evaluation);              
              }              
            }
          })
        })
      }
    });
    /* console.log(this.infoSelect); */
    
  }
  
  public openAddCourseModal() {
    const modalRef = this.modalService.open(AddCourseModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result == 'refresh') {
        this.getCourse();    
      }
    })    
  }

  public openAddEvaluationModal() {
    const modalRef = this.modalService.open(AddEvaluationModalComponent, { size: 'xl' });
    modalRef.componentInstance.subjectSelected = this.idSubjectSelected;
    modalRef.result.then((result) => {
      if (result == 'refresh') {
        this.getCourse();    
      }
    })    
  }

  public isFirst(first:boolean) {
    this.isFirstData = first;
  }

  public onValue(text :string) {
    this.textInput = text;
    this.textFilter = text;
  }

  public onEnter(text :string) {
    this.textFilter = text;
  }

  public searchButton() {
    this.textFilter = this.textInput;
  }

  public async refreshTable(isRefresh: any) {
    if(isRefresh) {
      this.getCourse();
    }
  }

}
