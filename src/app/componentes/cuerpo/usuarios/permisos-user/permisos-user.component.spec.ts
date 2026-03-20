import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosUserComponent } from './permisos-user.component';

describe('PermisosUserComponent', () => {
  let component: PermisosUserComponent;
  let fixture: ComponentFixture<PermisosUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermisosUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermisosUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
