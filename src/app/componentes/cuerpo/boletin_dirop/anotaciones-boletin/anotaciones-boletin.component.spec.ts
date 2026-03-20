import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotacionesBoletinComponent } from './anotaciones-boletin.component';

describe('AnotacionesBoletinComponent', () => {
  let component: AnotacionesBoletinComponent;
  let fixture: ComponentFixture<AnotacionesBoletinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnotacionesBoletinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnotacionesBoletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
