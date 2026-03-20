import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteInsitopComponent } from './reporte-insitop.component';

describe('ReporteInsitopComponent', () => {
  let component: ReporteInsitopComponent;
  let fixture: ComponentFixture<ReporteInsitopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteInsitopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteInsitopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
