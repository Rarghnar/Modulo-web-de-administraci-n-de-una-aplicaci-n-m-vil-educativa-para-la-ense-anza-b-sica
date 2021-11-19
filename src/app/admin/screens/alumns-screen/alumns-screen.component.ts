import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from 'src/app/core/models/student.model';
import { StudentProviderService } from 'src/app/core/providers/student/student-provider.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddStudentModalComponent } from '../../components/modals/add/add-student-modal/add-student-modal.component';
import { IsSuperadminService } from 'src/app/core/services/is-superadmin/is-superadmin.service';
import { Lesson } from '../../../core/models/lesson.model';
import { LessonProviderService } from '../../../core/providers/lesson/lesson-provider.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { TokenService } from '../../../core/services/token/token.service';
import { SubjectProviderService } from '../../../core/providers/subject/subject-provider.service';
import { Subject } from 'src/app/core/models/subject.model';
import { EvaluationProviderService } from '../../../core/providers/evaluation/evaluation-provider.service';
import { Evaluation } from 'src/app/core/models/evaluation.model';
import { EvaluationRecordProviderService } from 'src/app/core/providers/evaluation-record/evaluation-record-provider.service';
import { EvaluationRecord } from 'src/app/core/models/evaluation-record.model';

@Component({
  selector: 'app-alumns-screen',
  templateUrl: './alumns-screen.component.html',
  styleUrls: ['./alumns-screen.component.css']
})
export class AlumnsScreenComponent implements OnInit {

  public position: any;

  public infoSelect: any[];
  public infoSelectPartial: any[];
  public textInput!: string;
  public textFilter!: string;
  public isLoad: boolean = false;
  public isLoad2: boolean = false;
  public isAdmin: any = false;

  public dataStudent: Student[];
  public lessonData: Lesson[];
  public subjectsData: Subject[];
  public evaluationData: Evaluation[];
  public evaluationRecordData: EvaluationRecord[];
  public listSubjects: any[];
  public studentSelected: any[];
  public isLoadSelected: boolean = false;
  public optionSubject: any;
  public isFirstData: boolean = false;

  public marksEva: number[];

  constructor(
    private studentProvider: StudentProviderService,
    private lessonProvider: LessonProviderService,
    private subjectProvider: SubjectProviderService,
    private modalService: NgbModal,
    private configModal: NgbModalConfig,
    private tokenService: TokenService,
    private evaluationService: EvaluationProviderService,
    private evaluationRecordProvider: EvaluationRecordProviderService
    ) {
    this.dataStudent = [];
    this.lessonData = [];
    this.subjectsData = [];
    this.evaluationRecordData = [];
    this.evaluationData = [];
    this.listSubjects = [];
    this.studentSelected = [];
    this.configModal.backdrop = 'static';
    this.infoSelect = [];
    this.infoSelectPartial = [];
    this.marksEva = [];
  }

  async ngOnInit(): Promise<void> {
    if (JSON.parse(this.tokenService.getToken()).role === 'superadmin') {
      this.isAdmin = true          
    } else this.isAdmin = false;
    this.getInfo();
    /* this.getStudent();  */
  }

  public async getInfo() {
    try {
      this.isLoad = false;
      this.lessonData = await this.lessonProvider.getAllLesson().toPromise();
      this.subjectsData = await this.subjectProvider.getAllSubject().toPromise();
      this.dataStudent = await this.studentProvider.getAllStudents().toPromise();      
      this.evaluationData = await this.evaluationService.getAllEvaluations().toPromise();          
      this.isLoad = true;
    } catch (error) {
      console.log(error)
    }
  }

  public async getStudent() {
    try {
      this.isLoad = false;
      this.dataStudent = await this.studentProvider.getAllStudents().toPromise();
      this.isLoad = true;
    } catch (error) {
      console.log(error);      
    } 
  }

  public openAddStudentModal() {
    const modalRef = this.modalService.open(AddStudentModalComponent, { size: 'lg' });
    modalRef.result.then((result) => {
      if (result == 'refresh') {        
        this.getStudent();    
      }
    })    
  }

  public async getEvaluationById() {

  }

  async selectStudent(event:any) {    
    this.marksEva = [];

    let isLoad:boolean = false;   
    this.isLoad2 = false;
    let optionSub;    
    if (this.isFirstData) {
      if (event.course.length > 0){         
        optionSub = (this.subjectsData.find((subject:any) => subject._id == event.course[0].subjects[0]))
        this.optionSubject = optionSub?.name
      }
      else this.optionSubject = ''; 
      this.isFirstData = false     
    }    

    this.studentSelected = event;
    this.infoSelect = [];
    this.listSubjects = [];

    event.course[0].subjects.forEach((subject:any) => {
      let subjectFind:any = this.subjectsData.find((subjectF:any) => subjectF._id == subject);
      this.listSubjects.push(subjectFind)
    })    
    this.isLoad2 = false;   



    for (let i = 0; i < event.evaluationsRecords.length; i++) {
      event.course[0].subjects.forEach((subject:any) => { 
        let subjectFind:any = this.subjectsData.find((subjectF:any) => subjectF._id == subject)
        if (subjectFind?.name == this.optionSubject) {        
          subjectFind.units.forEach((unit:any) => {
            unit.lessons.forEach(async (lesson:any) => {            
              if (lesson.evaluation == event.evaluationsRecords[i].evaluation) {
                let average = this.getAverage(lesson.evaluation)
                try {                  
                  let eva = this.evaluationData.find(evaluation => evaluation._id == event.evaluationsRecords[i].evaluation);

                  const evaluation = {
                    name: eva?.name,
                    unit: unit?.name,
                    date: eva?.createdAt,
                    cantQuestion: eva?.questions.length,
                    mark: event.evaluationsRecords[i].mark,
                    averageMark: average
                  }
                  this.infoSelect.push(evaluation)
                  
                } catch (error) {
                  console.log(error);
                }
              }              
            })
          })
        }
      });
    }
    this.isLoad2 = true
  }  

  public getAverage(evaluationId:any) {
    let markStudent = [];
    let average = 0;
    for (const student of this.dataStudent) {
      const studentCurrent:any = student;
      for (const evaRecord of studentCurrent.evaluationsRecords) {
        if (evaRecord.evaluation === evaluationId) {
          markStudent.push(evaRecord.mark)
        }
      }
    }
    if (markStudent) {
      for (const mark of markStudent) {
        average = average + mark
      }
      average = Math.round(((average/markStudent.length)*100)/100);    
    }
    return average;
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
      this.getStudent();
    }
  }

}
