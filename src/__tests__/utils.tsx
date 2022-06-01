import {assignIdsToArrayItems} from '../utils';

test('Should assign unique ids to items in an array', () => {
  const array = ['one', 'two', 'three', 'four', 'five', 'six', 'seven'];
  const result = assignIdsToArrayItems(array);

  const ids = result.map(r => r.id);
  expect([...new Set(ids)].length).toBe(array.length);
});
