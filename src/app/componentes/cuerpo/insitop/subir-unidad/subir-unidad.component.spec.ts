import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirUnidadComponent } from './subir-unidad.component';

describe('SubirUnidadComponent', () => {
  let component: SubirUnidadComponent;
  let fixture: ComponentFixture<SubirUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirUnidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
