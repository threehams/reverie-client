import { List, Map } from 'immutable';
import { createSelector } from 'reselect';
import AllowedRecord from '../records/AllowedRecord';

const defaultFilter = new AllowedRecord({
  types: List(['command', 'exit'])
});

function applyAllowedOwners(objects, owners) {
  if (!owners.size) {
    return objects;
  }

  return objects.filter(object => object.owners.contains('player'));
}

function applyAllowedComponents(objects, components) {
  if (!components.size) {
    return objects;
  }

  // Allow object if it contains any of the expected components.
  return objects.filter(object => components.intersect(object.components).size);
}

function applyAllowedTypes(objects, types) {
  if (!types.size) {
    return objects;
  }

  return objects.filter((value, key) => types.contains(key));
}

/*
 *
 */
export function applyAllowed(objects, allowed) {
  return applyAllowedOwners(
    applyAllowedComponents(
      // filter by type, then flatten and combine to a single list
      applyAllowedTypes(
        objects,
        allowed.types
      ).toList().flatMap(item => item),
      allowed.components
    ),
    allowed.owners
  );
}

/*
 * Get a list of filters to apply to autocomplete by identifying the current command
 * (the first word) and determining the index of the currently-selected part by cursor location.
 */
const commandAllowed = createSelector(
  [
    state => state.get('command')
  ],
  ({ current, available, cursorIndex }) => {
    const parts = current.split(' ');
    if (parts.length === 1) {
      return defaultFilter;
    }
    const rootCommand = available.filter(command => {
      return command.name === parts[0];
    });
    if (!rootCommand) return null;
    
    // now figure out what part we're in and return the "allowed" for that part
    
  }
);

export const autocompleteFragment = createSelector(
  [
    state => state.get('command')
  ],
  ({ current, cursorIndex }) => {
    return current.slice(0, cursorIndex).split(' ').pop();
  }
);

export const availableOptions = createSelector(
  [
    autocompleteFragment,
    commandAllowed,
    state => state.get('entities').toList(),
    state => state.get('command').available,
  ],
  (fragment, allowed, entities, commands) => {
    if (!allowed) return List();

    // All possible objects usable by autocomplete, keyed by type
    const objects = Map({ entity: entities, command: commands });

    return applyAllowed(objects, allowed)
      .filter(item => item.name.includes(fragment))
      .sortBy(item => item.name.indexOf(fragment));
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
