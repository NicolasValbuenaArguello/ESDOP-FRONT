import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelotonesAetcrComponent } from './pelotones-aetcr.component';

describe('PelotonesAetcrComponent', () => {
  let component: PelotonesAetcrComponent;
  let fixture: ComponentFixture<PelotonesAetcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelotonesAetcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PelotonesAetcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
