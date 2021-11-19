import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSubjectsModalComponent } from './show-subjects-modal.component';

describe('ShowSubjectsModalComponent', () => {
  let component: ShowSubjectsModalComponent;
  let fixture: ComponentFixture<ShowSubjectsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSubjectsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSubjectsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
