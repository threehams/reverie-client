import { List, Map, Set } from 'immutable';
import { createSelector } from 'reselect';

import * as entitySelectors from './entitySelectors';
import AllowedRecord from '../records/AllowedRecord';
import CommandRecord from '../records/CommandRecord';

const defaultFilters = List([
  new AllowedRecord({
    types: Set(['command', 'exit'])
  })
]);

function applyAllowedOwners(objects, owners) {
  if (!owners.size) {
    return objects;
  }

  return objects.filter(object => owners.contains(object.owner));
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
  if (allowed.names.size) {
    return Set(allowed.names.map(name => {
      return new CommandRecord({
        name
      });
    }));
  }

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

// TODO gotta be a way to refactor this error-prone imperative code
// also apparently it's broken when trying to do immediate autocomplete after complete
function currentPart(parts, cursorIndex) {
  let totalLength = 0;
  let index = 0;
  for (const part of parts) {
    totalLength += part.length + 1;
    if (cursorIndex <= totalLength - 1) {
      return index - 1;
    }
    index++;
  }
  return Infinity;
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
      return defaultFilters;
    }
    const rootCommand = available.find(command => {
      return command.name === parts[0];
    });
    if (!rootCommand || !rootCommand.parts.size) return null;

    // now figure out what part we're in and return the "allowed" for that part
    return rootCommand.getIn(['parts', currentPart(parts, cursorIndex), 'allowed']);
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
    entitySelectors.entitiesWithPath,
    state => state.get('command').available,
  ],
  (fragment, allowed, entities, commands) => {
    if (!allowed || !allowed.size) return List();

    // All possible objects usable by autocomplete, keyed by type
    const objects = Map({ entity: entities.toList(), command: commands });
    const filtered = allowed.flatMap(allow => applyAllowed(objects, allow));

    return filtered.filter(item => item.name.includes(fragment))
    .sort((a, b) => {
      // If there's no fragment, sort by path, then name.
      if (!fragment.length) {
        if (a.path > b.path) return 1;
        if (a.path < b.path) return -1;
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      }

      // If there's a fragment, sort by first character with that fragment, then path, then name.
      const aIndex = a.name.indexOf(fragment);
      const bIndex = b.name.indexOf(fragment);
      if (aIndex > bIndex) return 1;
      if (aIndex < bIndex) return -1;
      if (a.path > b.path) return 1;
      if (a.path < b.path) return -1;
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
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
