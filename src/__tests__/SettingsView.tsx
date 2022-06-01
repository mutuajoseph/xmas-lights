import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {
  render,
  cleanup,
  fireEvent,
  getByTestId as getInElementByTestId
} from 'react-testing-library';

import {Settings} from '../types';
import {assignIdsToArrayItems} from '../utils';
import SettingsView from '../components/SettingsView';

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

afterEach(cleanup);

test('Should render with the correct values', () => {
  const {getAllByTestId, getByTestId} = render(
    <SettingsView
      isOpen={false}
      close={() => {}}
      onChange={() => {}}
      settings={settings}
    />
  );

  const [numOfRowsSpan, selectedPatternSpan] = getAllByTestId(
    'num-selector-value'
  );
  expect(numOfRowsSpan).toHaveTextContent('7');
  expect(selectedPatternSpan).toHaveTextContent('P1');

  const colorSettings = getByTestId('color-settings-container');

  settings.colors.forEach((color, i) => {
    expect(colorSettings.childNodes[i]).toHaveStyle(
      `background-color: ${color.value}`
    );
  });
});

test('Should call the close function prop when the backdrop is clicked', () => {
  const closeFn = jest.fn();
  const {getByTestId} = render(
    <SettingsView
      isOpen={true}
      close={closeFn}
      onChange={() => {}}
      settings={settings}
    />
  );

  fireEvent.click(getByTestId('settings-backdrop'));

  expect(closeFn).toHaveBeenCalled();
});

test('Should call the onChange callback when changes to the number of rows are made', () => {
  const onChangeFn = jest.fn();
  const {getByTestId} = render(
    <SettingsView
      isOpen={true}
      close={() => {}}
      onChange={onChangeFn}
      settings={{...settings, rows: 3}}
    />
  );

  const rowsSettingContainer = getByTestId('rows-setting-container');
  const decreaseRowsButton = getInElementByTestId(
    rowsSettingContainer,
    'num-selector-decrease-btn'
  );
  const increaseRowsButton = getInElementByTestId(
    rowsSettingContainer,
    'num-selector-increase-btn'
  );

  fireEvent.click(decreaseRowsButton);
  expect(onChangeFn).toHaveBeenLastCalledWith({rows: 2});
  fireEvent.click(increaseRowsButton);
  expect(onChangeFn).toHaveBeenLastCalledWith({rows: 4});
});

test('Should call the onChange callback when changes to the active pattern are made', () => {
  const onChangeFn = jest.fn();
  const {getByTestId} = render(
    <SettingsView
      isOpen={true}
      close={() => {}}
      onChange={onChangeFn}
      settings={{...settings, patternIndex: 1}}
    />
  );

  const rowsSettingContainer = getByTestId('pattern-setting-container');
  const decreasePatternButton = getInElementByTestId(
    rowsSettingContainer,
    'num-selector-decrease-btn'
  );
  const increasePatternButton = getInElementByTestId(
    rowsSettingContainer,
    'num-selector-increase-btn'
  );

  fireEvent.click(decreasePatternButton);
  expect(onChangeFn).toHaveBeenLastCalledWith({patternIndex: 0});
  fireEvent.click(increasePatternButton);
  expect(onChangeFn).toHaveBeenLastCalledWith({patternIndex: 2});
});
