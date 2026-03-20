import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargueInsitopComponent } from './cargue-insitop.component';

describe('CargueInsitopComponent', () => {
  let component: CargueInsitopComponent;
  let fixture: ComponentFixture<CargueInsitopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargueInsitopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargueInsitopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
