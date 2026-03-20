import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaMovimientoComponent } from './planilla-movimiento.component';

describe('PlanillaMovimientoComponent', () => {
  let component: PlanillaMovimientoComponent;
  let fixture: ComponentFixture<PlanillaMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillaMovimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanillaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
