import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsScreenComponent } from './statistics-screen.component';

describe('StatisticsScreenComponent', () => {
  let component: StatisticsScreenComponent;
  let fixture: ComponentFixture<StatisticsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
