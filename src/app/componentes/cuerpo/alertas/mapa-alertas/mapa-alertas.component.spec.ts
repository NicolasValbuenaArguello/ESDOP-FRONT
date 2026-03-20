import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAlertasComponent } from './mapa-alertas.component';

describe('MapaAlertasComponent', () => {
  let component: MapaAlertasComponent;
  let fixture: ComponentFixture<MapaAlertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaAlertasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaAlertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
