import { TestBed } from '@angular/core/testing';

import { EventHandlingService } from './event-handling.service';

describe('EventHandlingService', () => {
  let service: EventHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
