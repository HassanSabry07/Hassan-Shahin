import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Experince } from './experince';

describe('Experince', () => {
  let component: Experince;
  let fixture: ComponentFixture<Experince>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Experince]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Experince);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
