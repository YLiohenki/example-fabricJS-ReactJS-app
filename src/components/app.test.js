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
/*
  test('renders learn react link', () => {
    const linkElement = wrapper.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
  */
});