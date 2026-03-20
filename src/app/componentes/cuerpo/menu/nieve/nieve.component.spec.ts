import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NieveComponent } from './nieve.component';

describe('NieveComponent', () => {
  let component: NieveComponent;
  let fixture: ComponentFixture<NieveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NieveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
