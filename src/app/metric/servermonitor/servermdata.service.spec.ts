import { TestBed, inject } from '@angular/core/testing';

import { ServermdataService } from './servermdata.service';

describe('ServermdataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServermdataService]
    });
  });

  it('should be created', inject([ServermdataService], (service: ServermdataService) => {
    expect(service).toBeTruthy();
  }));
});
