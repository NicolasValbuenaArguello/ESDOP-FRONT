import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsitroPlanillaMovimientoComponent } from './regsitro-planilla-movimiento.component';

describe('RegsitroPlanillaMovimientoComponent', () => {
  let component: RegsitroPlanillaMovimientoComponent;
  let fixture: ComponentFixture<RegsitroPlanillaMovimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegsitroPlanillaMovimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegsitroPlanillaMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
