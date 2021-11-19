import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsScreenComponent } from './options-screen.component';

describe('OptionsScreenComponent', () => {
  let component: OptionsScreenComponent;
  let fixture: ComponentFixture<OptionsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
