import { createSelector } from 'reselect';

export const availableOptions = createSelector(
  [
    state => state.get('entities'),
    state => state.get('command').autocompleteFragment
  ],
  (entities, command) => {
    return entities
      .toList()
      .filter(item => item.name.includes(command));
  }
);

export const selectedOption = createSelector(
  [
    availableOptions,
    state => state.getIn(['command', 'autocompleteSelectedItem'])
  ],
  (options, selected) => {
    if (options.contains(selected)) return selected;
    return options.first();
  }
);
