import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnsScreenComponent } from './alumns-screen.component';

describe('AlumnsScreenComponent', () => {
  let component: AlumnsScreenComponent;
  let fixture: ComponentFixture<AlumnsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
