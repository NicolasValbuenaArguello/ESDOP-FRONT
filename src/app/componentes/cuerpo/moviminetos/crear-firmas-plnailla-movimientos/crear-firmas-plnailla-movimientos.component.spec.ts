import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFirmasPlnaillaMovimientosComponent } from './crear-firmas-plnailla-movimientos.component';

describe('CrearFirmasPlnaillaMovimientosComponent', () => {
  let component: CrearFirmasPlnaillaMovimientosComponent;
  let fixture: ComponentFixture<CrearFirmasPlnaillaMovimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFirmasPlnaillaMovimientosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFirmasPlnaillaMovimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
