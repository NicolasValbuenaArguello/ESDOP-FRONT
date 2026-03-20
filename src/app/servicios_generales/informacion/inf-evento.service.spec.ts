import { TestBed } from '@angular/core/testing';

import { InfEventoService } from './inf-evento.service';

describe('InfEventoService', () => {
  let service: InfEventoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfEventoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
