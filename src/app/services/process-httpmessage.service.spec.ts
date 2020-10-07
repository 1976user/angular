import { TestBed } from '@angular/core/testing';

import { ProcessHTTPMessageService } from './process-httpmessage.service';

describe('ProcessHTTPMessageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProcessHTTPMessageService = TestBed.get(ProcessHTTPMessageService);
    expect(service).toBeTruthy();
  });
});
