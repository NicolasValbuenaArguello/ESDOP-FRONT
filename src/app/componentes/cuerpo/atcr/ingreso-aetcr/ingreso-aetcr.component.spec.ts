import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoAetcrComponent } from './ingreso-aetcr.component';

describe('IngresoAetcrComponent', () => {
  let component: IngresoAetcrComponent;
  let fixture: ComponentFixture<IngresoAetcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoAetcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoAetcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
