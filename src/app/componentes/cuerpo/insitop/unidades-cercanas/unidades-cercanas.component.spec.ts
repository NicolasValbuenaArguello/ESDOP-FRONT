import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesCercanasComponent } from './unidades-cercanas.component';

describe('UnidadesCercanasComponent', () => {
  let component: UnidadesCercanasComponent;
  let fixture: ComponentFixture<UnidadesCercanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadesCercanasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadesCercanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
