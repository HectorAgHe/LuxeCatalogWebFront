import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandModal } from './brand-modal';

describe('BrandModal', () => {
  let component: BrandModal;
  let fixture: ComponentFixture<BrandModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandModal],
    }).compileComponents();

    fixture = TestBed.createComponent(BrandModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
