import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargueEventosDivComponent } from './cargue-eventos-div.component';

describe('CargueEventosDivComponent', () => {
  let component: CargueEventosDivComponent;
  let fixture: ComponentFixture<CargueEventosDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargueEventosDivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargueEventosDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
