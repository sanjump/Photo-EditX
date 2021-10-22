import { TestBed } from '@angular/core/testing';

import { NecessaryService } from './necessary.service';

describe('NecessaryService', () => {
  let service: NecessaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NecessaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
