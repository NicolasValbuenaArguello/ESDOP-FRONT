import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerDocumentComponent } from './ver-document.component';

describe('VerDocumentComponent', () => {
  let component: VerDocumentComponent;
  let fixture: ComponentFixture<VerDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
