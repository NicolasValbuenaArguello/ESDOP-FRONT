import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasosFronterizosComponent } from './pasos-fronterizos.component';

describe('PasosFronterizosComponent', () => {
  let component: PasosFronterizosComponent;
  let fixture: ComponentFixture<PasosFronterizosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PasosFronterizosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PasosFronterizosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
