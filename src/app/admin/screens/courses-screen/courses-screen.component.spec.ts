import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesScreenComponent } from './courses-screen.component';

describe('CoursesScreenComponent', () => {
  let component: CoursesScreenComponent;
  let fixture: ComponentFixture<CoursesScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
