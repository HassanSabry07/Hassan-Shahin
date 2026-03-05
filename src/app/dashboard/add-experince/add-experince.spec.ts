import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExperince } from './add-experince';

describe('AddExperince', () => {
  let component: AddExperince;
  let fixture: ComponentFixture<AddExperince>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExperince]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExperince);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
