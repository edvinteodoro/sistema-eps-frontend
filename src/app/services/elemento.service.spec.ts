import { TestBed } from '@angular/core/testing';

import { ElementoService } from './elemento.service';

describe('ElementoService', () => {
  let service: ElementoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
