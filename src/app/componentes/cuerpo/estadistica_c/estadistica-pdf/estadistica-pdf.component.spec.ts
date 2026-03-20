import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaPdfComponent } from './estadistica-pdf.component';

describe('EstadisticaPdfComponent', () => {
  let component: EstadisticaPdfComponent;
  let fixture: ComponentFixture<EstadisticaPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadisticaPdfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadisticaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
