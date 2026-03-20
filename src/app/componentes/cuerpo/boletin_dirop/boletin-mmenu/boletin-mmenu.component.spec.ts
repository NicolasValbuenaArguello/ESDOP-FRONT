import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoletinMmenuComponent } from './boletin-mmenu.component';

describe('BoletinMmenuComponent', () => {
  let component: BoletinMmenuComponent;
  let fixture: ComponentFixture<BoletinMmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoletinMmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoletinMmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
