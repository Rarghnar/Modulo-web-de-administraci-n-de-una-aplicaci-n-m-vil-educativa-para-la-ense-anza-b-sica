import { Component, HostListener, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form/form.service';
import { NotificationService } from '../../../../../core/services/notification/notification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Evaluation } from 'src/app/core/models/evaluation.model';
import { EvaluationProviderService } from 'src/app/core/providers/evaluation/evaluation-provider.service';
import { UnitProviderService } from '../../../../../core/providers/unit/unit-provider.service';
import { LessonProviderService } from '../../../../../core/providers/lesson/lesson-provider.service';
import { Unit } from 'src/app/core/models/unit.model';
import { Lesson } from 'src/app/core/models/lesson.model';
import { SelectionModel } from '@angular/cdk/collections';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize/capitalize.pipe';
import { QuestionProviderService } from '../../../../../core/providers/question/question-provider.service';

@Component({
  selector: 'admin-add-evaluation-modal',
  templateUrl: './add-evaluation-modal.component.html',
  styleUrls: ['./add-evaluation-modal.component.css']
})
export class AddEvaluationModalComponent implements OnInit {

  public checkoutForm!: FormGroup;
  public subjectSelected: any;
  public capitalizePipe = new CapitalizePipe();
  public imagePath = '';
  public imgURL: any;
  public imageChangedEvent: any;
  public isLoad: boolean = false;
  public unitSelected: any;
  public lessonSelected: any;
  public showFront:boolean = true;
  public isEdit:boolean = false;
  public isEmpty:boolean = false;
  public headerTables: any;
  public selection: SelectionModel<any>;
  public posEdit: number = 0;
  public isLoadButton:boolean = false;
  public lessonFilter:any [];

  p: number = 1;
  public isPaginator: boolean = false;
  public questions:any[];
  public alternatives:any[];
  public unitAll: Unit[];
  public lessonAll: Lesson[];
  public lessonList: any[];
  public questionList: any[]
  public addedImage: any;

  public validQuestion:boolean = false;
  public validAlternative:boolean = false;
  public validNameAlternative:boolean = false;
  public validCheckAlternative:boolean = true;

  constructor(
    private formService: FormService,
    private notificationService: NotificationService,
    private evaluationProviderService: EvaluationProviderService,
    private unitProviderService: UnitProviderService,
    private lessonProviderService: LessonProviderService,
    private questionProviderService: QuestionProviderService,    
    public activeModal: NgbActiveModal
    ) {
      this.headerTables = ['Pos','Pregunta','Cantidad Alternativa','Acciones'];
      this.unitAll = [];
      this.lessonAll = [];
      this.lessonList = [];
      this.lessonFilter = [];
      this.questionList = [];
      this.questions = [];
      this.alternatives = [];
      this.selection = new SelectionModel<any>(false, []);
      
      this.showFront = true
  }
  
  async ngOnInit(): Promise<void> {
    /* console.log(this.subjectSelected); */
    this.checkoutForm;
    this.getData();
    this.createFormGroup();
    this.setFormGroup();        
  }

  private createFormGroup() {
    this.checkoutForm = this.formService.buildFormGroup({
      nameEvaluation: new FormControl ('', [Validators.required]),
      subjectName: new FormControl ({value: '', disabled: true}, [Validators.required]),
      unit: new FormControl ('', [Validators.required]),
      lesson: new FormControl ('', [Validators.required]),
    });
  }

  public async getData() {    
    this.isLoad = false;
    this.unitAll = await this.unitProviderService.getAllUnit().toPromise();
    this.lessonAll = await this.lessonProviderService.getAllLesson().toPromise();
    
    this.isLoad = true;
  }

  public setFormGroup() {
    this.checkoutForm.patchValue({
      subjectName: this.capitalizePipe.transform(this.subjectSelected.name)
    })
  }
  
  public async addQuestion() {
    this.isPaginator = true;
    this.validNameAlternative = false;
    this.validCheckAlternative = false;
    let alternativeArray:any = [];
    if (this.alternatives.length <= 0) {
      this.validAlternative = true     
    } else this.validAlternative = false;

    if (document.querySelector<HTMLInputElement>('#question')!.value === '') {
      this.validQuestion = true;
    } else this.validQuestion = false;
    
    for (let i = 0; i < this.alternatives.length; i++) {
      if (document.querySelector<HTMLInputElement>('#alternative'+i)!.value === '') {
        this.validNameAlternative = true;
      } else this.validNameAlternative = false;

      if (document.querySelector<HTMLInputElement>('#checkbox'+i)!.checked === true) {
        this.validCheckAlternative = true;
      }

      if (!this.validNameAlternative && this.validCheckAlternative) {
        const valueAlternative = {
          alternative: document.querySelector<HTMLInputElement>('#alternative'+i)!.value,
          isCorrect: document.querySelector<HTMLInputElement>('#checkbox'+i)!.checked
        }
        alternativeArray.push(valueAlternative)        
      }
    }

    const questionValue = {
      questionName: document.querySelector<HTMLInputElement>('#question')!.value,
      alternatives: alternativeArray,
      image: this.addedImage? this.addedImage.url: '',
    }
      
    if (!this.validQuestion && !this.validAlternative && !this.validNameAlternative && this.validCheckAlternative) {
      this.questions.push(questionValue);
      this.alternatives = [];
      document.querySelector<HTMLInputElement>('#question')!.value = '';        
      this.showFront = !this.showFront
    }
  }

  public editQuestion(row:any, pos:number) {
    /* console.log(row); */
    this.alternatives = [];
    row.alternatives.forEach((element: any) => {
      this.alternatives.push(element);      
    });
    this.posEdit = pos;
    this.isEdit = true;
    document.querySelector<HTMLInputElement>('#question')!.value = row.questionName; 
  }
  
  public confimEditQuestion() {
    let alternativeArray:any = [];
  
    for (let i = 0; i < this.alternatives.length; i++) {
      const valueAlternative = {
        alternative: document.querySelector<HTMLInputElement>('#alternative'+i)!.value,
        isCorrect: document.querySelector<HTMLInputElement>('#checkbox'+i)!.checked
      }
      alternativeArray.push(valueAlternative)
    }
  
    const questionValue = {
      questionName: document.querySelector<HTMLInputElement>('#question')!.value,
      alternatives: alternativeArray,
      imageQuestion: this.addedImage
    }
    this.questions[this.posEdit] = questionValue;
    
    this.alternatives = [];
    document.querySelector<HTMLInputElement>('#question')!.value = '';  
    
  }
  
  public async onSubmit(form: FormGroupDirective): Promise<void> { 
    if ((this.checkoutForm.valid)) {
      this.isLoadButton = true;
      const evaluationData: any = {
        nameEvaluation: this.checkoutForm.get('nameEvaluation')?.value.trim(),
        unitId: this.unitSelected,
        lessonId: this.lessonSelected,
        questions: this.questions,
      };   
      if (!this.isEmpty) {
        try {
          /* await this.lessonProviderService.addEvaluationLesson(this.lessonSelected, evaluationData); */
          this.notificationService.success('Evaluación agregador correctamente');
          this.activeModal.close('refresh')
          form.resetForm();
          this.checkoutForm.reset();
          this.isLoadButton = false;
        } catch (error) {
          this.isLoadButton = false;
          this.notificationService.error('Ocurrio un error, vuelva a intentarlo');
          console.log(error);        
        }        
      } else {
        this.notificationService.error('No se agrego la evaluación');
      }
    }
    else{
      this.notificationService.error('Campos sin rellenar')
    }
  }



  public lessonSelect(lesson:any) {
    this.lessonSelected = lesson;
    /* console.log(lesson);  */   
  }

  public deleteQuestion(pos: number) {
    this.questions.splice(pos,1)
  }

  selectRow(row: any): void{
  }

  selectRowEdit(row: any): void{
     
  }
  
  public arraymove(pos:number, newPos:number) {
    var page = this.p;    
    if((pos + ((page-1) * 3)) === 0 && newPos < 0) return
    if (page !== 1) {
      if((pos + ((page-1) * 3)) === (this.questions.length-1) && newPos >= 1) return
    }
    var element = this.questions[(pos + ((page-1) * 3))];
    this.questions.splice((pos + ((page-1) * 3)),1)
    this.questions.splice(newPos,0,element)
  }
  
  selectData(pos: any) {    
    /* this.isFirst.emit(true)
    this.infoBack.emit(this.dataInfo[pos])  */   
  }
  
  public clearQuestion() {
    this.alternatives = [];
    document.querySelector<HTMLInputElement>('#question')!.value = '';  
  }
  
  public unitSelect(unit:any) {
    this.unitSelected = unit;
    
    this.lessonList = [];
    let lessonIds:any = [];
    this.subjectSelected.units.forEach((_unit: any) => {
      if (_unit._id === unit) {
        lessonIds = _unit.lessons   
      }      
    });
    
    lessonIds.forEach((lesson:any) => {
      this.lessonList.push(this.lessonAll.find((lessonFind: any) => lessonFind._id === lesson))
    })
    this.lessonFilter = []
    for (const lesson of this.lessonList) {
      if (!lesson.evaluation) {
        this.lessonFilter.push(lesson)
        this.isEmpty = false;
      }
    }
    
    if (this.lessonFilter.length <= 0) {
      this.isEmpty = true;
    }
  }
  
  public async selectFile(event: any): Promise<void> {
    let imageUpload:any;
    imageUpload = event.target.files[0];
    const reportForm = new FormData();
    reportForm.append('image', imageUpload);    
    /* this.addedImage = await this.questionProviderService.addImage(reportForm).toPromise(); */
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
