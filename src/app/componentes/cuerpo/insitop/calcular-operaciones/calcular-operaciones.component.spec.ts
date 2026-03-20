import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularOperacionesComponent } from './calcular-operaciones.component';

describe('CalcularOperacionesComponent', () => {
  let component: CalcularOperacionesComponent;
  let fixture: ComponentFixture<CalcularOperacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcularOperacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalcularOperacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
