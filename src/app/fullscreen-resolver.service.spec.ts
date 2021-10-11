import { TestBed } from '@angular/core/testing';

import { FullscreenResolverService } from './fullscreen-resolver.service';

describe('FullscreenResolverService', () => {
  let service: FullscreenResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullscreenResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
