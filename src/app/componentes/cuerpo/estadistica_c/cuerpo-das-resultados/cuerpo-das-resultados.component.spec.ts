import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuerpoDasResultadosComponent } from './cuerpo-das-resultados.component';

describe('CuerpoDasResultadosComponent', () => {
  let component: CuerpoDasResultadosComponent;
  let fixture: ComponentFixture<CuerpoDasResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CuerpoDasResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuerpoDasResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
