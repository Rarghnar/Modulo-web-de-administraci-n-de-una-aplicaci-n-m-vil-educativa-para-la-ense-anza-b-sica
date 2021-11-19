import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectsScreenComponent } from './subjects-screen.component';

describe('SubjectsScreenComponent', () => {
  let component: SubjectsScreenComponent;
  let fixture: ComponentFixture<SubjectsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
