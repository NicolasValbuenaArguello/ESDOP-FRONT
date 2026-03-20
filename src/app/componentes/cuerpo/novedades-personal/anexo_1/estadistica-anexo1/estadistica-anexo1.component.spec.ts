import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaAnexo1Component } from './estadistica-anexo1.component';

describe('EstadisticaAnexo1Component', () => {
  let component: EstadisticaAnexo1Component;
  let fixture: ComponentFixture<EstadisticaAnexo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaAnexo1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticaAnexo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
