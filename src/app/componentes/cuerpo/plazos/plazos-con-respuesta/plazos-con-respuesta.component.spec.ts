import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazosConRespuestaComponent } from './plazos-con-respuesta.component';

describe('PlazosConRespuestaComponent', () => {
  let component: PlazosConRespuestaComponent;
  let fixture: ComponentFixture<PlazosConRespuestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlazosConRespuestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlazosConRespuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
