import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesAisladasComponent } from './unidades-aisladas.component';

describe('UnidadesAisladasComponent', () => {
  let component: UnidadesAisladasComponent;
  let fixture: ComponentFixture<UnidadesAisladasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesAisladasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadesAisladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
