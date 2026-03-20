import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroQ5Component } from './registro-q5.component';

describe('RegistroQ5Component', () => {
  let component: RegistroQ5Component;
  let fixture: ComponentFixture<RegistroQ5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroQ5Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroQ5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
