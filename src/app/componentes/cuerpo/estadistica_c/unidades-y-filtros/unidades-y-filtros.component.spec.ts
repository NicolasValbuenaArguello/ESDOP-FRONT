import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesYFiltrosComponent } from './unidades-y-filtros.component';

describe('UnidadesYFiltrosComponent', () => {
  let component: UnidadesYFiltrosComponent;
  let fixture: ComponentFixture<UnidadesYFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesYFiltrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadesYFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
