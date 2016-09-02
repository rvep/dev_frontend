import { TestBed, inject, async } from '@angular/core/testing';

// Load the implementations that should be tested
import { Rvep } from './rvep.component';

describe('Rvep', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [Rvep]
    });
  }));

  it('should have a name', inject([Rvep], (rvep) => {
    expect(rvep.name).toEqual('rvep');
  }));

});
