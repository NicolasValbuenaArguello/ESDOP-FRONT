import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidacionPlazosComponent } from './validacion-plazos.component';

describe('ValidacionPlazosComponent', () => {
  let component: ValidacionPlazosComponent;
  let fixture: ComponentFixture<ValidacionPlazosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidacionPlazosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidacionPlazosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
