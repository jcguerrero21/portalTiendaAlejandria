/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EnvioService } from './envio.service';

describe('EnvioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvioService]
    });
  });

  it('should ...', inject([EnvioService], (service: EnvioService) => {
    expect(service).toBeTruthy();
  }));
});
