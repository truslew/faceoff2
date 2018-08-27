import { TestBed, inject } from '@angular/core/testing';

import { FaceoffDataService } from './faceoff-data.service';

describe('FaceoffDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaceoffDataService]
    });
  });

  it('should be created', inject([FaceoffDataService], (service: FaceoffDataService) => {
    expect(service).toBeTruthy();
  }));
});
