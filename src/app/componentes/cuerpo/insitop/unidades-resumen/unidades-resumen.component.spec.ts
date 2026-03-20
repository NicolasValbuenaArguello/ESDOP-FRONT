import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesResumenComponent } from './unidades-resumen.component';

describe('UnidadesResumenComponent', () => {
  let component: UnidadesResumenComponent;
  let fixture: ComponentFixture<UnidadesResumenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesResumenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadesResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
