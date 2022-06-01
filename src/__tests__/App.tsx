import React from 'react';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import {render, cleanup, fireEvent, act, wait} from 'react-testing-library';

import App from '../App';

afterEach(cleanup);

test('Should show the settings view after the settings button is clicked', async () => {
  const {getByTestId} = render(<App />);

  act(() => {
    fireEvent.click(getByTestId('open-settings-btn'));
  });

  await wait(() =>
    expect(getByTestId('settings-view')).toHaveStyle(
      'transform: translateY(0%)'
    )
  );
});
