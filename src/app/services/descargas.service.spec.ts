import { TestBed } from '@angular/core/testing';

import { DescargasService } from './descargas.service';

describe('DescargasService', () => {
  let service: DescargasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescargasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
