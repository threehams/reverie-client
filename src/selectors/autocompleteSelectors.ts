import { List, Set } from 'immutable';
import { createSelector } from 'reselect';

import * as entitySelectors from './entitySelectors';
import { Allowed, Command, Entity, Exit, State } from '../records';

const INSTANCE_TYPES = {
  command: Command,
  entity: Entity,
  exit: Exit,
};

function compare(a, b) {
  if (a > b) { return 1; }
  if (a < b) { return -1; }
  return 0;
}

const defaultFilters = List([
  new Allowed({
    types: Set(['command', 'exit']),
  }),
]);

function applyAllowedOwners(objects, owners) {
  if (!owners.size) {
    return objects;
  }

  return objects.filter(object => owners.contains(object.owner));
}

function applyAllowedStates(objects, states) {
  if (!states.size) {
    return objects;
  }

  return objects.filter(object => states.intersect(object.states).size);
}

function applyAllowedComponents(objects, components) {
  if (!components.size) {
    return objects;
  }

  // Allow object if it contains any of the expected components.
  return objects.filter(object => {
    if (!object.components || !object.components.size) {
      return false;
    }

    let found = false;
    // returning false has special meaning to forEach, and this is a necessary performance improvement
    // eslint-disable-next-line consistent-return
    components.forEach((component) => {
      if (object.components.includes(component)) {
        found = true;
        return false;
      }
    });
    return found;
  });
}

function applyAllowedTypes(objects, types) {
  if (!types.size) {
    return objects;
  }

  return objects.filter(object => {
    for (const type of types) {
      if (object instanceof INSTANCE_TYPES[type]) {
        return true;
      }
    }
    return false;
  });
}

/*
 * Filter objects based on different attributes within records.
 */
export function applyAllowed(objects, allowed) {
  if (allowed.names.size) {
    return Set(allowed.names.map(name => {
      return new Command({
        name,
      });
    }));
  }

  return applyAllowedOwners(
    applyAllowedComponents(
      applyAllowedStates(
        // filter by type, then flatten and combine to a single list
        applyAllowedTypes(
          objects,
          allowed.types
        ),
        allowed.states
      ),
      allowed.components
    ),
    allowed.owners
  );
}

/*
 * Get the index of the current part.
 *
 * This will break if there are multiple spaces between commands. Is that a problem? It only affects autocomplete.
 * You decide!
 *
 */
function currentPartIndex(parts, cursorIndex) {
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
  (state: State) => state.command.current,
  (state: State) => state.command.available,
  (state: State) => state.command.cursorIndex,
  (current, available, cursorIndex) => {
    const parts = current.split(' ');
    if (parts.length === 1) {
      return defaultFilters;
    }
    const rootCommand = available.find(command => {
      return command.name === parts[0];
    });
    if (!rootCommand || !rootCommand.parts.size) {
      return null;
    }

    // now figure out what part we're in and return the "allowed" for that part
    return rootCommand.getIn(['parts', currentPartIndex(parts, cursorIndex), 'allowed']);
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
  (state: State) => state.command.current,
  (state: State) => state.command.cursorIndex,
  (current, cursorIndex) => {
    return current.slice(0, cursorIndex).split(' ').pop();
  }
);

const sortedOptions = createSelector(
  entitySelectors.entitiesWithPath,
  (state: State) => state.command.available,
  (state: State) => state.location.exits || List([]),
  (entities, commands, exits) => {
    return entities.toSetSeq()
    .concat(commands)
    .concat(exits.map(exit => new Exit({ name: exit })))
    .sort((a, b) => {
      // reminder:
      // Return 0 if the elements should not be swapped.
      // Return -1 (or any negative number) if valueA comes before valueB
      // Return 1 (or any positive number) if valueA comes after valueB

      // Sort exits first, then path, then name.
      return compare(b instanceof Exit, a instanceof Exit)
        || compare(a.path, b.path)
        || compare(a.name, b.name);
    });
  }
);

/*
 * Creates a list of available options for autocomplete based on the rules for the command.
 * Current command is derived from command + cursor location.
 *
 */
export const availableOptions = createSelector(
  autocompleteFragment,
  commandAllowed,
  sortedOptions,
  (fragment: string, allowed, options) => {
    if (!allowed || !allowed.size) { return List(); }

    // All possible objects usable by autocomplete, keyed by type
    let filteredByFragment = options;
    if (fragment) {
      filteredByFragment = options.filter(object => object.name.includes(fragment));
    }

    const filtered = allowed.flatMap(allow => applyAllowed(filteredByFragment, allow));
    return filtered.sort((a, b) => {
      if (fragment) {
        return compare(a.name.indexOf(fragment), b.name.indexOf(fragment));
      }
      return compare(a.path, b.path) || compare(a.name, b.name);
    }).slice(0, 20);
  }
);

export const selectedOption = createSelector(
  availableOptions,
  (state: State) => state.command.autocompleteSelectedItem,
  (options, selected) => {
    if (options.contains(selected)) { return selected; }
    return options.first();
  }
);
