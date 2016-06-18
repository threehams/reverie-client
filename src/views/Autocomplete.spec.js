import { expect } from '../__test__/configureExpect';

import { Autocomplete } from './Autocomplete';

describe('Autocomplete', function() {
  describe('renderOption', function() {
    it('styles the first occurrence of the command', function() {
      const option = 'autocomplete';
      const command = 'comp';
      expect(new Autocomplete().splitOption(option, command)).to.eql(['auto', 'comp', 'lete']);
    });
  });
});
