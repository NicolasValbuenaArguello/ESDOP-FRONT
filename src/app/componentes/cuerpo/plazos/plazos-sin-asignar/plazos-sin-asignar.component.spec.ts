import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazosSinAsignarComponent } from './plazos-sin-asignar.component';

describe('PlazosSinAsignarComponent', () => {
  let component: PlazosSinAsignarComponent;
  let fixture: ComponentFixture<PlazosSinAsignarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlazosSinAsignarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlazosSinAsignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
