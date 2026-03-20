import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaExcelComponent } from './estadistica-excel.component';

describe('EstadisticaExcelComponent', () => {
  let component: EstadisticaExcelComponent;
  let fixture: ComponentFixture<EstadisticaExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticaExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
