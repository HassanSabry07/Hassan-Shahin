import { TestBed } from '@angular/core/testing';

import { AboutServices } from './about.services';

describe('AboutServices', () => {
  let service: AboutServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AboutServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
