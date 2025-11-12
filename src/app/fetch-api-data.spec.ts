import { TestBed } from '@angular/core/testing';

import { UserRegistrationService } from './fetch-api-data';

describe('FetchApiData', () => {
  let service: UserRegistrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
