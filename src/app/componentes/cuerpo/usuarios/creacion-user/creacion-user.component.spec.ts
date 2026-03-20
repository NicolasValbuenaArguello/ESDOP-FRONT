import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreacionUserComponent } from './creacion-user.component';

describe('CreacionUserComponent', () => {
  let component: CreacionUserComponent;
  let fixture: ComponentFixture<CreacionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreacionUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreacionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
