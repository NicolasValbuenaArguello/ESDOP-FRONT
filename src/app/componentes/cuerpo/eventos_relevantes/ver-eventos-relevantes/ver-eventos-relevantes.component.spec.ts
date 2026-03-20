import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerEventosRelevantesComponent } from './ver-eventos-relevantes.component';

describe('VerEventosRelevantesComponent', () => {
  let component: VerEventosRelevantesComponent;
  let fixture: ComponentFixture<VerEventosRelevantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerEventosRelevantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerEventosRelevantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
