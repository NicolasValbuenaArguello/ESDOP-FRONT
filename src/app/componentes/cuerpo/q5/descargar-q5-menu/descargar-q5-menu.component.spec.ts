import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescargarQ5MenuComponent } from './descargar-q5-menu.component';

describe('DescargarQ5MenuComponent', () => {
  let component: DescargarQ5MenuComponent;
  let fixture: ComponentFixture<DescargarQ5MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DescargarQ5MenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DescargarQ5MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
