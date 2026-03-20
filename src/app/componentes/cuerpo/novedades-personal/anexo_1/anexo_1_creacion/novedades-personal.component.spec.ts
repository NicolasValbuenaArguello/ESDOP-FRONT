import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadesPersonalComponent } from './novedades-personal.component';

describe('NovedadesPersonalComponent', () => {
  let component: NovedadesPersonalComponent;
  let fixture: ComponentFixture<NovedadesPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovedadesPersonalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovedadesPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
