import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {render, cleanup} from 'react-testing-library';

import ChristmasLightBulb from '../components/ChristmasLightBulb';

afterEach(cleanup);

test('Renders with the correct size', () => {
  const size = 30;
  const {getByTestId} = render(<ChristmasLightBulb style={{}} size={size} />);

  expect(getByTestId('light-bulb')).toHaveStyle(`
    width: ${size}px;
    height: ${size}px;
  `);
});
