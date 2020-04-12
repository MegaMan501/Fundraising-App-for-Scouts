import { TestBed } from '@angular/core/testing';

import { MembersLeaderService } from './members-leader.service';

describe('MembersLeaderService', () => {
  let service: MembersLeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MembersLeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
