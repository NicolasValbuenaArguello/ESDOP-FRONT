import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoQ5DipseComponent } from './ingreso-q5-dipse.component';

describe('IngresoQ5DipseComponent', () => {
  let component: IngresoQ5DipseComponent;
  let fixture: ComponentFixture<IngresoQ5DipseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoQ5DipseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresoQ5DipseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
