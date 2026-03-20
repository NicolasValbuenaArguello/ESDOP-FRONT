import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertasEditarComponent } from './alertas-editar.component';

describe('AlertasEditarComponent', () => {
  let component: AlertasEditarComponent;
  let fixture: ComponentFixture<AlertasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertasEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
