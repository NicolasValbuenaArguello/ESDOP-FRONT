import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionAetcrComponent } from './informacion-aetcr.component';

describe('InformacionAetcrComponent', () => {
  let component: InformacionAetcrComponent;
  let fixture: ComponentFixture<InformacionAetcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionAetcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionAetcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
