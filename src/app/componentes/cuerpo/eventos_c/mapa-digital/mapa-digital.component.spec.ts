import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaDigitalComponent } from './mapa-digital.component';

describe('MapaDigitalComponent', () => {
  let component: MapaDigitalComponent;
  let fixture: ComponentFixture<MapaDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaDigitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
