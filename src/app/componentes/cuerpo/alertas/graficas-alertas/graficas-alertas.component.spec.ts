import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasAlertasComponent } from './graficas-alertas.component';

describe('GraficasAlertasComponent', () => {
  let component: GraficasAlertasComponent;
  let fixture: ComponentFixture<GraficasAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasAlertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
