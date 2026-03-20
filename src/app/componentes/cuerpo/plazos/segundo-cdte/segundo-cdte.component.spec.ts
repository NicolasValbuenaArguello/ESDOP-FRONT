import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundoCdteComponent } from './segundo-cdte.component';

describe('SegundoCdteComponent', () => {
  let component: SegundoCdteComponent;
  let fixture: ComponentFixture<SegundoCdteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegundoCdteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegundoCdteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
