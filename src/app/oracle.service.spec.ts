import { TestBed } from '@angular/core/testing';

import { OracleService } from './oracle.service';

describe('OracleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OracleService = TestBed.get(OracleService);
    expect(service).toBeTruthy();
  });
});
