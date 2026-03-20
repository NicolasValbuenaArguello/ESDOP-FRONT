import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAetcrComponent } from './mapa-aetcr.component';

describe('MapaAetcrComponent', () => {
  let component: MapaAetcrComponent;
  let fixture: ComponentFixture<MapaAetcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaAetcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaAetcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
