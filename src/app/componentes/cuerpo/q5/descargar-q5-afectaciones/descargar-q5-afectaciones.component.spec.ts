import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarQ5AfectacionesComponent } from './descargar-q5-afectaciones.component';

describe('DescargarQ5AfectacionesComponent', () => {
  let component: DescargarQ5AfectacionesComponent;
  let fixture: ComponentFixture<DescargarQ5AfectacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarQ5AfectacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarQ5AfectacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
