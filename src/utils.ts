import shortid from 'shortid';

/**
 * Creates a new array assigning a unique id to each item
 */
export const assignIdsToArrayItems = <T = {}>(
  array: T[]
): ({id: string; value: T})[] => array.map(assignId);

/**
 * Assigns a new unique id to the passed value.
 */
export const assignId = <T = {}>(value: T): {id: string; value: T} => ({
  id: shortid.generate(),
  value
});
