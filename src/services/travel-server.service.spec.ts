import { TestBed } from '@angular/core/testing';

import { TravelServerService } from './travel-server.service';

describe('TravelServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelServerService = TestBed.get(TravelServerService);
    expect(service).toBeTruthy();
  });
});
