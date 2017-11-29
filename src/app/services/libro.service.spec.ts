/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LibroService } from './libro.service';

describe('LibroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LibroService]
    });
  });

  it('should ...', inject([LibroService], (service: LibroService) => {
    expect(service).toBeTruthy();
  }));
});
