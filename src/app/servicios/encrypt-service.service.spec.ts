import { TestBed } from '@angular/core/testing';

import { EncryptServiceService } from './encrypt-service.service';

describe('EncryptServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EncryptServiceService = TestBed.get(EncryptServiceService);
    expect(service).toBeTruthy();
  });
});
