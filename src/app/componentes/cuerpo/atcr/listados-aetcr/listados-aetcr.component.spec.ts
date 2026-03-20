import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosAetcrComponent } from './listados-aetcr.component';

describe('ListadosAetcrComponent', () => {
  let component: ListadosAetcrComponent;
  let fixture: ComponentFixture<ListadosAetcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadosAetcrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadosAetcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
