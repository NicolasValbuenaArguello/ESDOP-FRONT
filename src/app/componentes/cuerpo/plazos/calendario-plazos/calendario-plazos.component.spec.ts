import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioPlazosComponent } from './calendario-plazos.component';

describe('CalendarioPlazosComponent', () => {
  let component: CalendarioPlazosComponent;
  let fixture: ComponentFixture<CalendarioPlazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarioPlazosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioPlazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
