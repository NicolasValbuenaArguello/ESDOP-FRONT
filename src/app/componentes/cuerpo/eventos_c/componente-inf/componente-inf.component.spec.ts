import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteInfComponent } from './componente-inf.component';

describe('ComponenteInfComponent', () => {
  let component: ComponenteInfComponent;
  let fixture: ComponentFixture<ComponenteInfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponenteInfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteInfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
