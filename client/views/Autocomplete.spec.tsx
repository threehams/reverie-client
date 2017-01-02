import { expect } from '../../__test__/configureExpect';

import { splitOption } from './Autocomplete';

describe('Autocomplete', () => {
  describe('renderOption', () => {
    it('styles the first occurrence of the command', () => {
      const option = 'autocomplete';
      const command = 'comp';
      expect(splitOption(option, command)).to.eql(['auto', 'comp', 'lete']);
    });
  });
});
