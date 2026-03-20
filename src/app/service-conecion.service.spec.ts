import { TestBed } from '@angular/core/testing';

import { ServiceConecionService } from './service-conecion.service';

describe('ServiceConecionService', () => {
  let service: ServiceConecionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceConecionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
