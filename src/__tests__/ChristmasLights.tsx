import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {render, cleanup} from 'react-testing-library';

import {Settings} from '../types';
import {assignIdsToArrayItems} from '../utils';
import ChristmasLights from '../components/ChristmasLights';

afterEach(cleanup);

const settings: Settings = {
  colors: assignIdsToArrayItems([
    '#4CAF50',
    '#5E35B1',
    '#536DFE',
    '#03A9F4',
    '#CDDC39',
    '#FFC107',
    '#FF5722'
  ]),
  rows: 7,
  patternIndex: 0
};

test('Renders 7 light bulbs', () => {
  const {getAllByTestId} = render(
    <ChristmasLights isPlaying settings={{...settings, rows: 1}} />
  );

  const lightBulbs = getAllByTestId('light-bulb');
  expect(lightBulbs).toHaveProperty('length', 7);
});

test('Renders 14 light bulbs with 2 rows', () => {
  const {getAllByTestId} = render(
    <ChristmasLights isPlaying settings={{...settings, rows: 2}} />
  );

  const lightBulbs = getAllByTestId('light-bulb');
  expect(lightBulbs).toHaveProperty('length', 14);
});

test('Renders 49 light bulbs with 7 rows', () => {
  const {getAllByTestId} = render(
    <ChristmasLights isPlaying settings={settings} />
  );

  const lightBulbs = getAllByTestId('light-bulb');
  expect(lightBulbs).toHaveProperty('length', 49);
});
