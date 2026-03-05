import { TestBed } from '@angular/core/testing';

import { SkillsServices } from './skills.services';

describe('SkillsServices', () => {
  let service: SkillsServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkillsServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
