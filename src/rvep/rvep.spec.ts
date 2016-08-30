import { addProviders, inject } from '@angular/core/testing';

// Load the implementations that should be tested
import { Rvep } from './rvep.component';

describe('Rvep', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => addProviders([Rvep]));

  it('should have a name', inject([Rvep], (rvep) => {
    expect(rvep.name).toEqual('rvep');
  }));

});
