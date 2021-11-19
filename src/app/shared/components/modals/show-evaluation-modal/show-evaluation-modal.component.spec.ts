import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEvaluationModalComponent } from './show-evaluation-modal.component';

describe('ShowEvaluationModalComponent', () => {
  let component: ShowEvaluationModalComponent;
  let fixture: ComponentFixture<ShowEvaluationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowEvaluationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEvaluationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
