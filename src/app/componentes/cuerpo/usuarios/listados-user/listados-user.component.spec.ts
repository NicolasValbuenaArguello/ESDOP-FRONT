import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadosUserComponent } from './listados-user.component';

describe('ListadosUserComponent', () => {
  let component: ListadosUserComponent;
  let fixture: ComponentFixture<ListadosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadosUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
