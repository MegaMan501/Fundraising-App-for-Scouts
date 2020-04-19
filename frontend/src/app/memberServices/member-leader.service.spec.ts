import { TestBed } from '@angular/core/testing';

import { MemberLeaderService } from './member-leader.service';

describe('MemberLeaderService', () => {
  let service: MemberLeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberLeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
