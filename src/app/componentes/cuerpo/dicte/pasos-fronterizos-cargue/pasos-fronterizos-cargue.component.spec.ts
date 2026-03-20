import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasosFronterizosCargueComponent } from './pasos-fronterizos-cargue.component';

describe('PasosFronterizosCargueComponent', () => {
  let component: PasosFronterizosCargueComponent;
  let fixture: ComponentFixture<PasosFronterizosCargueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasosFronterizosCargueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasosFronterizosCargueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
