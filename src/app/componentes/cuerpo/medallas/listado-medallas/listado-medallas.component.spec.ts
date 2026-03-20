import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMedallasComponent } from './listado-medallas.component';

describe('ListadoMedallasComponent', () => {
  let component: ListadoMedallasComponent;
  let fixture: ComponentFixture<ListadoMedallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoMedallasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoMedallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
