import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasInsitopEstadoMayorComponent } from './graficas-insitop-estado-mayor.component';

describe('GraficasInsitopEstadoMayorComponent', () => {
  let component: GraficasInsitopEstadoMayorComponent;
  let fixture: ComponentFixture<GraficasInsitopEstadoMayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasInsitopEstadoMayorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasInsitopEstadoMayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
