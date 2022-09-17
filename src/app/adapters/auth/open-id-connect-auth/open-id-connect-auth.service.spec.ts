import { TestBed } from '@angular/core/testing';

import { OpenIdConnectAuthService } from './open-id-connect-auth.service';

describe('OpenIdConnectAuthService', () => {
  let service: OpenIdConnectAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenIdConnectAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
