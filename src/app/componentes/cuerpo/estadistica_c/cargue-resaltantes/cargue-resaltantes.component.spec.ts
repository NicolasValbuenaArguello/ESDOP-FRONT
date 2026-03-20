import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargueResaltantesComponent } from './cargue-resaltantes.component';

describe('CargueResaltantesComponent', () => {
  let component: CargueResaltantesComponent;
  let fixture: ComponentFixture<CargueResaltantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargueResaltantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargueResaltantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
