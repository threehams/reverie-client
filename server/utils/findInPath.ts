import { Entity, EntityState } from '../records';

export function pathArray(path: string, userId: string, locationId: string): string[] {
  return path.replace(/^self/, userId).replace(/^floor/, locationId).split('/');
}

export function findIn(pathArray: string[], entities: EntityState): Entity | null {
  const resultId = pathArray.slice(1).reduce((parentId, name, index) => {
    if (!parentId) {
      return null;
    }
    return entities.get(parentId).entities.find((id) => {
      return entities.get(id).name === name;
    });
  }, pathArray[0]);
  return resultId ? entities.get(resultId) : null;
}
