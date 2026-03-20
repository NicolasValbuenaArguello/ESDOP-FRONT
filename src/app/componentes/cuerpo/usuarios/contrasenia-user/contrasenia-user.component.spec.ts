import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraseniaUserComponent } from './contrasenia-user.component';

describe('ContraseniaUserComponent', () => {
  let component: ContraseniaUserComponent;
  let fixture: ComponentFixture<ContraseniaUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraseniaUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContraseniaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
