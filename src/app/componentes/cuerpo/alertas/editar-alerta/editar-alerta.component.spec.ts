import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlertaComponent } from './editar-alerta.component';

describe('EditarAlertaComponent', () => {
  let component: EditarAlertaComponent;
  let fixture: ComponentFixture<EditarAlertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarAlertaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
