import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazosAsignadosComponent } from './plazos-asignados.component';

describe('PlazosAsignadosComponent', () => {
  let component: PlazosAsignadosComponent;
  let fixture: ComponentFixture<PlazosAsignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlazosAsignadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlazosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
