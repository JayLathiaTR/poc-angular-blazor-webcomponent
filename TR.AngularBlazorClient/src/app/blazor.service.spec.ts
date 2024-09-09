import { TestBed } from '@angular/core/testing';

import { BlazorService } from './blazor.service';

describe('BlazorService', () => {
  let service: BlazorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlazorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
