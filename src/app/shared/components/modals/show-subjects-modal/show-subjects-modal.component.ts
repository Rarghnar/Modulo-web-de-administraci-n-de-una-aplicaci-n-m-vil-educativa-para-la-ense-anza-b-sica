import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Evaluation } from 'src/app/core/models/evaluation.model';
import { Student } from 'src/app/core/models/student.model';
import { FormService } from 'src/app/core/services/form/form.service';
import { EvaluationProviderService } from '../../../../core/providers/evaluation/evaluation-provider.service';
import { StudentProviderService } from '../../../../core/providers/student/student-provider.service';

@Component({
  selector: 'shared-show-subjects-modal',
  templateUrl: './show-subjects-modal.component.html',
  styleUrls: ['./show-subjects-modal.component.css']
})
export class ShowSubjectsModalComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public subjectSelected: any;
  public unitSelected:any;
  public lessonSelected:any;
  public evaluationSelected:any;
  public headerTables:string[];
  public selection: SelectionModel<any>;
  public lessonsFilter:any[];
  public evaluationAll:Evaluation[];
  public studentAll:Student[];
  public studentMark:any;
  public unitDescription:any;

  public isLoad = true;
  public isFront: boolean = true;
  p = 0;


  constructor(
    public activeModal: NgbActiveModal,
    private formService: FormService,
    private evaluationsProviderServices: EvaluationProviderService,
    private studentProviderServices: StudentProviderService
  ) {
    this.lessonsFilter = [];
    this.evaluationAll = [];
    this.studentAll = [];
    this.studentMark = [];
    this.headerTables =['Pregunta','Cantidad de Estudiantes que han hecho la evaluación'];
    this.selection = new SelectionModel<any>(false, []);
  }

  ngOnInit(): void {
    this.checkoutForm;
    this.createFormGroup();
    this.getEvaluations();
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      units: new FormControl (''),
      lessons: new FormControl (''),
    });
  }

  public async getEvaluations() {
    try {
      this.isLoad = true;
      this.evaluationAll = await this.evaluationsProviderServices.getAllEvaluations().toPromise();      
      this.studentAll = await this.studentProviderServices.getAllStudents().toPromise();      
      this.isLoad = false;
    } catch (error) {
      
    }
  }

  public selectedUnit(unit:any) {  
    this.checkoutForm.patchValue({
      lessons: ''
    })
    this.unitDescription = unit.description;
    if (unit) {
      this.unitSelected = unit._id;
      this.lessonsFilter = [];
      for (const lesson of unit.lessons) {
        this.lessonsFilter.push(lesson)
      }          
    }
    
  }

  public selectedLesson(lesson:any) {
    this.lessonSelected = lesson;
    this.evaluationSelected = '';
    this.studentMark = 0;
    let i = 0;
    for (const student of this.studentAll) {
      if (student.evaluationsRecords) {
        let evaluationRecords:any = student.evaluationsRecords;
        for (const evaluationRecord of evaluationRecords) {
          if (evaluationRecord.evaluation === lesson.evaluation) {
            this.studentMark = ++i;
          }
        }
      }      
    }
    if (this.lessonSelected.evaluation) {
      this.evaluationSelected = this.evaluationAll.find((evaluation:any) => evaluation._id === lesson.evaluation);
    }
  }

  public showQuestion(question:any) {    
  }

}
