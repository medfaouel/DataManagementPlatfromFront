import { TestBed } from '@angular/core/testing';

import { NormalAuthService } from './normal-auth.service';

describe('NormalAuthService', () => {
  let service: NormalAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NormalAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
