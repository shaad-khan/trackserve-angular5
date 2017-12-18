import { TestBed, inject } from '@angular/core/testing';

import { AppmonitordataService } from './appmonitordata.service';

describe('AppmonitordataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppmonitordataService]
    });
  });

  it('should be created', inject([AppmonitordataService], (service: AppmonitordataService) => {
    expect(service).toBeTruthy();
  }));
});
