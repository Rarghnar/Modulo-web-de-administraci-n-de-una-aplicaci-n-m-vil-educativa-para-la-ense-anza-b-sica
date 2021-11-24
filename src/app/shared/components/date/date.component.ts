import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import * as moment from 'moment';
import { StudentProviderService } from '../../../core/providers/student/student-provider.service';
import { CapitalizePipe } from '../../pipes/capitalize/capitalize.pipe';
import { Course } from '../../../core/models/course.model';
import { Evaluation } from '../../../core/models/evaluation.model';
import { EvaluationProviderService } from '../../../core/providers/evaluation/evaluation-provider.service';

@Component({
  selector: 'shared-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {

  @Output() AvarageStudents: EventEmitter<any> = new EventEmitter();
  @Output() dateMonth: EventEmitter<any> = new EventEmitter();

  public date: any;
  public dateNow: any;
  public months: any[];
  public monthSelected: string;

  public dataStudent: any;
  public names: any[]
  public markStudent: any = [];
  public promedioAlumn: any = [];
  public isLoad:boolean = false;

  public evaluationAll: Evaluation[];
  public evaluationList: any[];
  public dateNowMonth: any;

  public evaluationMonth: any;
  @Input() alumnsInCourse: any[];
  @Input() promediosAlumnos: any[];

  flag=1;
  public evaluationFinded: any;

  constructor(
    private studentProvider: StudentProviderService,
    public capitalizePipe: CapitalizePipe,
    private evaluationProvider: EvaluationProviderService, 
  ) { 
    this.months = ['Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    this.monthSelected = this.months[0];

    
    this.names = [];
    this.promediosAlumnos = [];
    this.alumnsInCourse= [];

    this.evaluationAll = [];
    this.evaluationList = [];
  }

  ngOnInit(): void {
    this.getStudents();
    this.getEvaluations()
    this.dateNow = moment();
    
    this.date = [];
    this.AvarageStudents.emit([]);
  }
  
  public async getEvaluations() {    
    try {
      this.evaluationAll = await this.evaluationProvider.getAllEvaluations().toPromise();           
    } catch (error) {
      console.log(error);      
    }
  }
  
  public async getStudents() {
    try {
      this.dataStudent = await this.studentProvider.getAllStudents().toPromise();            
    } catch (error) {
      console.log(error);      
    }
  }
  
  selected(event: any, i: number, month: string) {  
    this.monthSelected = month;
    this.markStudent = [];
    this.promedioAlumn = [];
    this.promediosAlumnos = [];
    
    for (const studentCourseSelected of this.alumnsInCourse) {
      const student:any = studentCourseSelected;
      this.promediosAlumnos = [];
      for (const evaRecord of student.evaluationsRecords) {
        this.evaluationFinded = this.evaluationAll.find((evaluation: any) => evaluation._id === evaRecord.evaluation);
        this.evaluationMonth = this.capitalizePipe.transform(moment(this.evaluationFinded?.createdAt).format("MMMM"));
        if(this.monthSelected == this.evaluationMonth){
          if(this.evaluationFinded){
            this.markStudent.push(evaRecord.mark);
          }
        }
      }
      this.createAverage(this.markStudent);
    }    
    this.AvarageStudents.emit(this.promediosAlumnos);
    this.promediosAlumnos = [];
  }

  createAverage(marks: number[]){
    let average = 0;
    if(marks){
      for (const mark of marks) {
        average = average + mark
      }
      
      average = Math.round(((average/marks.length)*100)/100); 
      if (average) {
        this.promediosAlumnos.push(average);
      } else {
        this.promediosAlumnos.push(null)
      }
    }
  }
}