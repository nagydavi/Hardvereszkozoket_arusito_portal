import { TestBed } from '@angular/core/testing';

import { PendriveService } from './pendrive.service';

describe('PendriveService', () => {
  let service: PendriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
