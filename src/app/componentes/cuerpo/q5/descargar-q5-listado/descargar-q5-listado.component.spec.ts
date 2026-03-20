import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarQ5ListadoComponent } from './descargar-q5-listado.component';

describe('DescargarQ5ListadoComponent', () => {
  let component: DescargarQ5ListadoComponent;
  let fixture: ComponentFixture<DescargarQ5ListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarQ5ListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarQ5ListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
