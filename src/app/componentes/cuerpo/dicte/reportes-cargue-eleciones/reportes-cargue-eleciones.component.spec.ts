import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCargueElecionesComponent } from './reportes-cargue-eleciones.component';

describe('ReportesCargueElecionesComponent', () => {
  let component: ReportesCargueElecionesComponent;
  let fixture: ComponentFixture<ReportesCargueElecionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportesCargueElecionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportesCargueElecionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
