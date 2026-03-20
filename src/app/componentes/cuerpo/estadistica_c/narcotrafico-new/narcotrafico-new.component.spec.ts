import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NarcotraficoNewComponent } from './narcotrafico-new.component';

describe('NarcotraficoNewComponent', () => {
  let component: NarcotraficoNewComponent;
  let fixture: ComponentFixture<NarcotraficoNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NarcotraficoNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NarcotraficoNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
