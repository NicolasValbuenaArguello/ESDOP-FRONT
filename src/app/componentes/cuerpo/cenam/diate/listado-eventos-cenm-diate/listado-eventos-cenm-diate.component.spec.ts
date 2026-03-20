import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoEventosCenmDiateComponent } from './listado-eventos-cenm-diate.component';

describe('ListadoEventosCenmDiateComponent', () => {
  let component: ListadoEventosCenmDiateComponent;
  let fixture: ComponentFixture<ListadoEventosCenmDiateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoEventosCenmDiateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoEventosCenmDiateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
