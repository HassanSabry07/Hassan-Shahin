import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFooter } from './add-footer';

describe('AddFooter', () => {
  let component: AddFooter;
  let fixture: ComponentFixture<AddFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFooter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
