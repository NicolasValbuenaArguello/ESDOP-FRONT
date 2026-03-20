import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarEventosRelevantesComponent } from './guardar-eventos-relevantes.component';

describe('GuardarEventosRelevantesComponent', () => {
  let component: GuardarEventosRelevantesComponent;
  let fixture: ComponentFixture<GuardarEventosRelevantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuardarEventosRelevantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuardarEventosRelevantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
