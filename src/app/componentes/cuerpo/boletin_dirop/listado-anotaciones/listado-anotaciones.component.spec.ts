import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAnotacionesComponent } from './listado-anotaciones.component';

describe('ListadoAnotacionesComponent', () => {
  let component: ListadoAnotacionesComponent;
  let fixture: ComponentFixture<ListadoAnotacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoAnotacionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoAnotacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
