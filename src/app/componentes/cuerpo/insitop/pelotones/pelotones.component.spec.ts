import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PelotonesComponent } from './pelotones.component';

describe('PelotonesComponent', () => {
  let component: PelotonesComponent;
  let fixture: ComponentFixture<PelotonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PelotonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PelotonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
