import { TestBed } from '@angular/core/testing';

import { SelectoresService } from './selectores.service';

describe('SelectoresService', () => {
  let service: SelectoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
