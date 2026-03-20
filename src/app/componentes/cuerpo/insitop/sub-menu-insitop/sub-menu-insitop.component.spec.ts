import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuInsitopComponent } from './sub-menu-insitop.component';

describe('SubMenuInsitopComponent', () => {
  let component: SubMenuInsitopComponent;
  let fixture: ComponentFixture<SubMenuInsitopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubMenuInsitopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMenuInsitopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
