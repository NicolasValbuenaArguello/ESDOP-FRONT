import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficasInsitopComponent } from './graficas-insitop.component';

describe('GraficasInsitopComponent', () => {
  let component: GraficasInsitopComponent;
  let fixture: ComponentFixture<GraficasInsitopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraficasInsitopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficasInsitopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
