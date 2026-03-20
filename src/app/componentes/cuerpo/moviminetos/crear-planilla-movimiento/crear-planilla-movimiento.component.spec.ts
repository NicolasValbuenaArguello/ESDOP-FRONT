import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPlanillaMovimientoComponent } from './crear-planilla-movimiento.component';

describe('CrearPlanillaMovimientoComponent', () => {
  let component: CrearPlanillaMovimientoComponent;
  let fixture: ComponentFixture<CrearPlanillaMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPlanillaMovimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPlanillaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
