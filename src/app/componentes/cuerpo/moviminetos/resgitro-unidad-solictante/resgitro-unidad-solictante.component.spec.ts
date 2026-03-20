import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgitroUnidadSolictanteComponent } from './resgitro-unidad-solictante.component';

describe('ResgitroUnidadSolictanteComponent', () => {
  let component: ResgitroUnidadSolictanteComponent;
  let fixture: ComponentFixture<ResgitroUnidadSolictanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResgitroUnidadSolictanteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResgitroUnidadSolictanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
