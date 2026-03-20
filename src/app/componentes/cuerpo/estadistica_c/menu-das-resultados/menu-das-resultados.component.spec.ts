import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDasResultadosComponent } from './menu-das-resultados.component';

describe('MenuDasResultadosComponent', () => {
  let component: MenuDasResultadosComponent;
  let fixture: ComponentFixture<MenuDasResultadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuDasResultadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDasResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
