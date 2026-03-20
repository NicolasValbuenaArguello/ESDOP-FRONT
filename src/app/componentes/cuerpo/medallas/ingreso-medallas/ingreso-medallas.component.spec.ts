import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoMedallasComponent } from './ingreso-medallas.component';

describe('IngresoMedallasComponent', () => {
  let component: IngresoMedallasComponent;
  let fixture: ComponentFixture<IngresoMedallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoMedallasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoMedallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
