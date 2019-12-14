import React from 'react';
import UploadImage from './uploadImage';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import reducer from './../../reducer';

describe('Upload component', () => {
  const mockStore = configureStore([]);
  let store;
  let wrapper;
  let state;


  beforeEach(() => {
    state = {};
    store = mockStore(() => state);
    store.replaceReducer(reducer);

    store.dispatch = jest.fn();

    wrapper = render(
      (<Provider store={store}>
        <UploadImage />
      </Provider>));
  });

  it('should render input', () => {
    expect(wrapper.container.querySelectorAll('input[type="file"]').length).toEqual(1);
  });

  it('should dispatch IMAGE_UPLOAD on image upload', async () => {
    const file = new File(['(⌐□_□)'], 'someimage.png', { type: 'image/png' })
    const imageInput = wrapper.getByLabelText('Upload Image:');
    Object.defineProperty(imageInput, 'files', { value: [file] });
    fireEvent.change(imageInput);

    await waitForElement(() => wrapper.getByText('Upload Success'));
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  })
});