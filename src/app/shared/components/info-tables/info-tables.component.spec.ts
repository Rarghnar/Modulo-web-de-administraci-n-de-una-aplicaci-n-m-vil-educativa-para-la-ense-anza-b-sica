import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTablesComponent } from './info-tables.component';

describe('InfoTablesComponent', () => {
  let component: InfoTablesComponent;
  let fixture: ComponentFixture<InfoTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
