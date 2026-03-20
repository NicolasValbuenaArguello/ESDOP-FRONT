import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosAnexo1Component } from './listados-anexo1.component';

describe('ListadosAnexo1Component', () => {
  let component: ListadosAnexo1Component;
  let fixture: ComponentFixture<ListadosAnexo1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadosAnexo1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadosAnexo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
