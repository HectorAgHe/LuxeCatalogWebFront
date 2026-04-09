import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogModal } from './catalog-modal';

describe('CatalogModal', () => {
  let component: CatalogModal;
  let fixture: ComponentFixture<CatalogModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
