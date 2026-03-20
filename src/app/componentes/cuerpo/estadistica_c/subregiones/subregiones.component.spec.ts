import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubregionesComponent } from './subregiones.component';

describe('SubregionesComponent', () => {
  let component: SubregionesComponent;
  let fixture: ComponentFixture<SubregionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubregionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubregionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
