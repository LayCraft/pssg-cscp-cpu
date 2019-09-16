import { TestBed } from '@angular/core/testing';

import { ProgramInformationService } from './program-information.service';

describe('ProgramInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgramInformationService = TestBed.get(ProgramInformationService);
    expect(service).toBeTruthy();
  });
});
