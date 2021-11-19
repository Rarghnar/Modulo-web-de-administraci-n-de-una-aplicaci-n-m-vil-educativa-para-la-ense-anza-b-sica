import { Component, Input, OnInit } from '@angular/core';
import { StudentProviderService } from '../../../core/providers/student/student-provider.service';
import { CapitalizePipe } from '../../../shared/pipes/capitalize/capitalize.pipe';

import * as moment from 'moment';
import 'moment/locale/es';
import { CourseProviderService } from '../../../core/providers/course/course-provider.service';
import { Course } from '../../../core/models/course.model';
import { SubjectProviderService } from '../../../core/providers/subject/subject-provider.service';
import { EvaluationProviderService } from '../../../core/providers/evaluation/evaluation-provider.service';


@Component({
  selector: 'app-statistics-screen',
  templateUrl: './statistics-screen.component.html',
  styleUrls: ['./statistics-screen.component.css']
})
export class StatisticsScreenComponent implements OnInit {

  public monthChart: any;
  public avarageStudent: any;
  public listSubjects: any;
  public listCourses: any[];
  public allCourses: any;
  public allSubjects: any
  public isLoad= false;
  public subjectSelected: any;
  public courseSelected: any;
  public optionCourse: any;
  public optionSubject: any;
  public coursesInSubject: any[];
  public isFirstData: boolean = false;
  public AlumnsInCourse: any[];

  public promediosAlumnos: any[];
  public evaluationAll: any[];
  public searchedEvaluation: any;
  public evaluationMonth: any;
  public months: any[];
  public monthSelected: any;
  public promedioAlumn: any;

  constructor(
    private studentProvider: StudentProviderService,
    public capitalizePipe: CapitalizePipe,
    private courseProvider: CourseProviderService,
    private subjectProvider: SubjectProviderService,
    private evaluationProvider: EvaluationProviderService,
    
    ) {
    this.listCourses= [];
    this.coursesInSubject = [];
    this.AlumnsInCourse = []
    this.promediosAlumnos = [];
    this.evaluationAll = [];
    this.months = ['Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    this.monthSelected = this.months[0].day;
  }

  ngOnInit(): void {
    this.getCourses();
    this.getEvaluations();
    /* this.selectCourse(this.allCourses[0]); */
    this.getSubjects();
  }

  averageStudent(event: any) {    
    this.avarageStudent = event;
  }

  public async getEvaluations() {    
    try {
      this.evaluationAll = await this.evaluationProvider.getAllEvaluations().toPromise();           
    } catch (error) {
      console.log(error);      
    }
  }

  public async getCourses() {
    try {
      this.isLoad = false;
      this.allCourses = await this.courseProvider.getAllCourses().toPromise(); 
          
      this.isLoad = true;               
    } catch (error) {
      console.log(error);      
    }
    for (let i = 0; i < this.allCourses.length; i++) {
      const curse = this.allCourses[i];
      this.listCourses[i] = curse;
      for (let j = 0; j < curse.subjects.length; j++) {
        const subject = curse.subjects;
        this.listSubjects = subject
      }
      this.listCourses = [];
    }  
  }

  public async getSubjects() {
    try {
      this.allSubjects = await this.subjectProvider.getAllSubject().toPromise();      
    } catch (error) {
      console.log(error)
    }
  }

  selectCourse(event:any){        
    this.AlumnsInCourse = [];
    this.promediosAlumnos = [];
    this.avarageStudent = []
    this.courseSelected = this.allCourses.find((x: any) => x._id === event);    
    if(this.courseSelected){
      for (const courses of this.allCourses) {
        const course:any = courses
        if (this.courseSelected._id === course._id) {
          for (const student of course.students) {
            this.AlumnsInCourse.push(student)
          }          
        }
      }    
    }
  }

  selectSubject(event:any){    
    this.coursesInSubject = [];
    this.avarageStudent = []
    this.optionCourse = '';
    document.querySelector<HTMLInputElement>('#selectCourse')!.value = '';
    this.subjectSelected = this.allSubjects.find((x: any) => x._id === event);
    
    if(this.subjectSelected){
      for (let i = 0; i < this.allCourses.length; i++) {
        if(this.allCourses[i]){
          for (let j = 0; j < this.allCourses[i].subjects.length; j++) {
            if(this.subjectSelected._id === this.allCourses[i].subjects[j]._id){
              this.coursesInSubject.push(this.allCourses[i]);
            }
          }
        }
      } 
    }    
    this.AlumnsInCourse = [];
  }

}
