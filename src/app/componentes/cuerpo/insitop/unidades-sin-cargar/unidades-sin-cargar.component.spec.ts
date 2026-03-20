import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesSinCargarComponent } from './unidades-sin-cargar.component';

describe('UnidadesSinCargarComponent', () => {
  let component: UnidadesSinCargarComponent;
  let fixture: ComponentFixture<UnidadesSinCargarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesSinCargarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadesSinCargarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
