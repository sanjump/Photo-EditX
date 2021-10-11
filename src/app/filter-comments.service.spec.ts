import { TestBed } from '@angular/core/testing';

import { FilterCommentsService } from './filter-comments.service';

describe('FilterCommentsService', () => {
  let service: FilterCommentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterCommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
