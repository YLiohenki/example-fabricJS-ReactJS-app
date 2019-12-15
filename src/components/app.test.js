import React from 'react';
import { render } from '@testing-library/react';
import App from './app';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('App component', () => {
  const mockStore = configureStore([]);
  let store;
  let wrapper;
  let state = {};


  beforeEach(() => {
    store = mockStore(() => state);
    state.filters = { blur: { isOn: true, intensity: 0.33 }, sepia: { isOn: false, intensity: 0.00 }, vintage: { isOn: false, intensity: 0.66 } };
    wrapper = render(
      (<Provider store={store}>
        <App />
      </Provider>));
  });

  test('should render input[type="file"], input[type="checkbox"], input[type="range"] and canvas', () => {
    expect(wrapper.container.querySelectorAll('input[type="file"]').length).toBeGreaterThan(0);
    expect(wrapper.container.querySelectorAll('canvas').length).toBeGreaterThan(0);
    expect(wrapper.container.querySelectorAll('input[type="checkbox"]').length).toBeGreaterThan(0);
    expect(wrapper.container.querySelectorAll('input[type="range"]').length).toBeGreaterThan(0);
  });

});