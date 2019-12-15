import React from 'react';
import { render } from '@testing-library/react';
import App from './app';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('App component', () => {
  const mockStore = configureStore([]);
  let store;
  let wrapper;


  beforeEach(() => {
    store = mockStore({});

    wrapper = render(
      (<Provider store={store}>
        <App />
      </Provider>));
  });

  test('should render input[type="file"] and canvas', () => {
    expect(wrapper.container.querySelectorAll('input[type="file"]').length).toBeGreaterThan(0);
    expect(wrapper.container.querySelectorAll('canvas').length).toBeGreaterThan(0);
  });

});