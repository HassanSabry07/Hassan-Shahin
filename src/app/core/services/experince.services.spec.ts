import { TestBed } from '@angular/core/testing';

import { ExperinceServices } from './experince.services';

describe('ExperinceServices', () => {
  let service: ExperinceServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExperinceServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
