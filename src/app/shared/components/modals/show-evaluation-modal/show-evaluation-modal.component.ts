import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CapitalizePipe } from 'src/app/shared/pipes/capitalize/capitalize.pipe';
import { Evaluation } from 'src/app/core/models/evaluation.model';
import { Alternative } from 'src/app/core/models/alternative.model';
import { AlternativeProviderService } from 'src/app/core/providers/alternative/alternative-provider.service';

@Component({
  selector: 'shared-show-evaluation-modal',
  templateUrl: './show-evaluation-modal.component.html',
  styleUrls: ['./show-evaluation-modal.component.css']
})
export class ShowEvaluationModalComponent implements OnInit {

  public evaluationSelected:any;
  public capitalizePipe = new CapitalizePipe();
  public headerTables: any;
  public selection: SelectionModel<any>;
  public showFront: boolean = true;
  public isLoad:boolean = true;
  public imageUrl:any;
  p: number = 1;

  public alternativeList:Alternative[];
  public alternativeAll:Alternative[];

  constructor(
    public activeModal: NgbActiveModal,
    private alternativeProviderService: AlternativeProviderService
  ) {
    this.headerTables = ['Pregunta','Cantidad Alternativa','Acción'];
    this.alternativeList = [];
    this.alternativeAll = [];
    this.selection = new SelectionModel<any>(false, []);
  }

  async ngOnInit(): Promise<void> {   
    await this.getData();
    this.setValue();       
  }

  public async getData() {
    try {
      this.alternativeAll = await this.alternativeProviderService.getAllAlternative().toPromise();     
      this.isLoad = true;
    } catch (error) { 
      console.log(error);      
    }    
  }

  public setValue() {   
    document.querySelector<HTMLInputElement>('#nameEvaluation')!.value = this.capitalizePipe.transform(this.evaluationSelected.evaluations.name);
    document.querySelector<HTMLInputElement>('#nameSubject')!.value = this.capitalizePipe.transform(this.evaluationSelected.nameSubject);
    document.querySelector<HTMLInputElement>('#nameUnit')!.value = this.capitalizePipe.transform(this.evaluationSelected.unitName);
    document.querySelector<HTMLInputElement>('#nameLesson')!.value = this.capitalizePipe.transform(this.evaluationSelected.lessonName);
  }

  public showQuestion(row:any) {
    this.alternativeList = [];
    for (const alternative of row.alternatives) {              
      const alternativeFinded =  this.alternativeAll.find((alternativeFind:any) => alternativeFind._id === alternative);
      this.alternativeList.push(alternativeFinded!)
    }  
    document.querySelector<HTMLInputElement>('#question')!.value = this.capitalizePipe.transform(row.content);
    this.imageUrl = row.imageAnwser;    
    this.showFront = false;
  }

}
