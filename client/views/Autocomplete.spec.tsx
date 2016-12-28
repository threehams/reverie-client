import { expect } from '../../__test__/configureExpect';

import { AutocompleteBase } from './Autocomplete';

describe('Autocomplete', () => {
  describe('renderOption', () => {
    it('styles the first occurrence of the command', () => {
      const option = 'autocomplete';
      const command = 'comp';
      expect(new AutocompleteBase().splitOption(option, command)).to.eql(['auto', 'comp', 'lete']);
    });
  });
});
