import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHeader } from './add-header';

describe('AddHeader', () => {
  let component: AddHeader;
  let fixture: ComponentFixture<AddHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
