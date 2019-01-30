import { TestBed } from '@angular/core/testing';

import { SemanaservicioService } from './semanaservicio.service';

describe('SemanaservicioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemanaservicioService = TestBed.get(SemanaservicioService);
    expect(service).toBeTruthy();
  });
});
