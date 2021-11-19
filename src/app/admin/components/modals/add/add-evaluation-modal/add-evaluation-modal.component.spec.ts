import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEvaluationModalComponent } from './add-evaluation-modal.component';

describe('AddEvaluationModalComponent', () => {
  let component: AddEvaluationModalComponent;
  let fixture: ComponentFixture<AddEvaluationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEvaluationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEvaluationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
