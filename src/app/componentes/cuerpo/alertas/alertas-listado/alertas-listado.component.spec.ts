import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasListadoComponent } from './alertas-listado.component';

describe('AlertasListadoComponent', () => {
  let component: AlertasListadoComponent;
  let fixture: ComponentFixture<AlertasListadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertasListadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertasListadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
