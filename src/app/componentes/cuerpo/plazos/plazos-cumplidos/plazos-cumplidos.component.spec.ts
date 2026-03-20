import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazosCumplidosComponent } from './plazos-cumplidos.component';

describe('PlazosCumplidosComponent', () => {
  let component: PlazosCumplidosComponent;
  let fixture: ComponentFixture<PlazosCumplidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlazosCumplidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlazosCumplidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
