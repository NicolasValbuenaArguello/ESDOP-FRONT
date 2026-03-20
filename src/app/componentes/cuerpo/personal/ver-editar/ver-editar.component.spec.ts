import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEditarComponent } from './ver-editar.component';

describe('VerEditarComponent', () => {
  let component: VerEditarComponent;
  let fixture: ComponentFixture<VerEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
