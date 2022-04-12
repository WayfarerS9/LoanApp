import { TestBed } from '@angular/core/testing';

import { RegAuthService } from './reg-auth.service';

describe('RegAuthService', () => {
  let service: RegAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
