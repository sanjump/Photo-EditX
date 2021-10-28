import { TestBed } from '@angular/core/testing';

import { BtnPressedService } from './btn-pressed.service';

describe('BtnPressedService', () => {
  let service: BtnPressedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtnPressedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
