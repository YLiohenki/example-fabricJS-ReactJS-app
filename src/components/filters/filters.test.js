import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render, fireEvent } from '@testing-library/react';
import reducer from '../../reducer';
import Filters from './filters';

describe('Filters component', () => {
    const mockStore = configureStore([]);
    let store;
    let wrapper;
    let state;

    beforeEach(() => {
        state = { image: {} };
        store = mockStore(() => state);
        store.replaceReducer(reducer);

        store.dispatch = jest.fn();
    });


    it('should render inputs', () => {
        state.filters = { blur: { isOn: true, intensity: 0.33 }, sepia: { isOn: false, intensity: 0.00 }, vintage: { isOn: false } };
        wrapper = render(
            (<Provider store={store}>
                <Filters />
            </Provider>));
        expect(wrapper.container.querySelectorAll('input').length).toBeGreaterThan(0);
    });

    it('should correctly render checkboxes', () => {
        state.filters = { blur: { isOn: true, intensity: 0.33 }, sepia: { isOn: false, intensity: 0.00 }, vintage: { isOn: false } };
        wrapper = render(
            (<Provider store={store}>
                <Filters />
            </Provider>));
        expect(wrapper.getByLabelText('Blur Filter:').checked).toEqual(true);
        expect(wrapper.getByLabelText('Sepia Filter:').checked).toEqual(false);
        expect(wrapper.getByLabelText('Vintage Filter:').checked).toEqual(false);
    });

    it('should correctly render sliders', () => {
        state.filters = { blur: { isOn: true, intensity: 0.33 }, sepia: { isOn: false, intensity: 0.00 }, vintage: { isOn: false} };
        wrapper = render(
            (<Provider store={store}>
                <Filters />
            </Provider>));

        expect(new Number(wrapper.getByLabelText('Blur Intensity:').value)).toEqual(0.33);
    });

    it('should dispatch action on range change', () => {
        state.filters = { blur: { isOn: true, intensity: 0.33 }, sepia: { isOn: false, intensity: 0.00 }, vintage: { isOn: false } };
        wrapper = render(
            (<Provider store={store}>
                <Filters />
            </Provider>));
        var blurInput = wrapper.getByLabelText('Blur Intensity:')
        fireEvent.change(blurInput, { target: { value: "0.10" } });

        expect(store.dispatch).toHaveBeenCalled();
    });

    it('should dispatch action on range change', () => {
        state.filters = { blur: { isOn: true, intensity: 0.33 }, sepia: { isOn: false, intensity: 0.00 }, vintage: { isOn: false } };
        wrapper = render(
            (<Provider store={store}>
                <Filters />
            </Provider>));
        var blurCheckbox = wrapper.getByLabelText('Sepia Filter:')
        fireEvent.click(blurCheckbox, { target: { value: true, checked: true } });

        expect(store.dispatch).toHaveBeenCalled();
    });
});