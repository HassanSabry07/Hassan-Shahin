import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHome } from './add-home';

describe('AddHome', () => {
  let component: AddHome;
  let fixture: ComponentFixture<AddHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
