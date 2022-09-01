import { TestBed } from '@angular/core/testing';

import { OpenIdConnectAuthGuard } from './open-id-connect-auth.guard';

describe('OpenIdConnectAuthGuard', () => {
  let guard: OpenIdConnectAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OpenIdConnectAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
