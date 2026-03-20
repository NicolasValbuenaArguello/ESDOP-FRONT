import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaResultadosComponent } from './mapa-resultados.component';

describe('MapaResultadosComponent', () => {
  let component: MapaResultadosComponent;
  let fixture: ComponentFixture<MapaResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
