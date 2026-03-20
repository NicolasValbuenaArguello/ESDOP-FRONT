import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasIngresoComponent } from './alertas-ingreso.component';

describe('AlertasIngresoComponent', () => {
  let component: AlertasIngresoComponent;
  let fixture: ComponentFixture<AlertasIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertasIngresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertasIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
