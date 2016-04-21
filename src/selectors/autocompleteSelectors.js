import { List, Map, Set } from 'immutable';
import { createSelector } from 'reselect';

import * as entitySelectors from './entitySelectors';
import AllowedRecord from '../records/AllowedRecord';
import CommandRecord from '../records/CommandRecord';
import ExitRecord from '../records/ExitRecord';

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

/*
 * Determine the part of the command which should be considered for autocomplete,
 * which is the current whitespace-separated part up to the cursor.
 * Example:
 *
 * command:      get inven
 * cursor index: 6
 * fragment:     in
 *
 */
export const autocompleteFragment = createSelector(
  [
    state => state.get('command')
  ],
  ({ current, cursorIndex }) => {
    return current.slice(0, cursorIndex).split(' ').pop();
  }
);

/*
 * Creates a list of available options for autocomplete based on the rules for the command.
 * Current command is derived from command + cursor location.
 *
 */
export const availableOptions = createSelector(
  [
    autocompleteFragment,
    commandAllowed,
    entitySelectors.entitiesWithPath,
    state => state.get('command').available,
    state => state.getIn(['location', 'exits']) || List()
  ],
  (fragment, allowed, entities, commands, exits) => {
    if (!allowed || !allowed.size) return List();

    // All possible objects usable by autocomplete, keyed by type
    const objects = Map({
      entity: entities.toList(),
      command: commands,
      exit: exits.map(exit => { return new ExitRecord({ name: exit }); })
    });
    const filtered = allowed.flatMap(allow => applyAllowed(objects, allow));

    return filtered.filter(item => item.name.includes(fragment))
    .sort((a, b) => {
      // reminder:
      // Return 0 if the elements should not be swapped.
      // Return -1 (or any negative number) if valueA comes before valueB
      // Return 1 (or any positive number) if valueA comes after valueB

      // If there's no fragment, sort by exit first, then path, then name.
      if (!fragment.length) {
        if (a.path > b.path) return 1;
        if (a.path < b.path) return -1;
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
      }

      // TODO this can be refactored - subtrack aIndex and bIndex. don't know the order.
      // If there's a fragment, sort by first character with that fragment, then exits first, then path, then name.
      const aIndex = a.name.indexOf(fragment);
      const bIndex = b.name.indexOf(fragment);
      if (aIndex > bIndex) return 1;
      if (aIndex < bIndex) return -1;
      const aExit = (a instanceof ExitRecord);
      const bExit = (b instanceof ExitRecord);
      if (!aExit && bExit) return 1;
      if (aExit && !bExit) return -1;
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
