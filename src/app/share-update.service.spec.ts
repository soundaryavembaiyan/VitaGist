import { TestBed } from '@angular/core/testing';

import { ShareUpdateService } from './share-update.service';

describe('ShareUpdateService', () => {
  let service: ShareUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
