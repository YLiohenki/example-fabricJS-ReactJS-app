import React from 'react';
import DownloadImage from './downloadImage';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import reducer from '../../reducer';

describe('Download Image component', () => {
    const mockStore = configureStore([]);
    let store;
    let wrapper;
    let state;

    beforeEach(() => {
        state = {
            image: { file: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAk1BMVEXNMzPLNDXTo5/GOC3PJS/LNC7MNDHJNTXYq6TOMjXLNjDOMy7INTXetLHlvbjLIDHrx7/DIS7RMS/pybrAITHQJSzKMznGNzHINyzTpJrdrqrl/f795ef65tP528v11s7yz8PoycLzur/n5eHsu8G9BCuyJCS+JCrRACrTl57muLG/OSvOLyrQp53etazQIjXU0skJUiQmAAAC3ElEQVR4nO3daY+aQADG8Rm5hEE5lLPXuttW3cVuv/+nK0qtTmKCdiXmGZ5fDMbIMf8wCW8IiE+fv3z99vQUx/G8NevUdT3VTP7ftFddz64wv0Z8ZhGv4sXzi/j+4+d6uUw6kc4eXnRPiWadLJP1Zitek7dSCifQWJqy/bSsmx22umbDYAhl4AVWVolXu2zStFEdxz1Qlzi3uriXy9xeKu2n77NJfVW2hbOkEL70Qo30z8mP8fvJsJ93jfO1Ai+XRbQ7Fh7+7vbTLrpRybsEdokXQqUvtcLTCDz9Z/d182GtMBf7wl+J1QgR6FNCdOv0z52P+nsgca/9Haf8flm6fnqYpVHghp4rzONK6Vj2hIXAWIiPhfiOhXVkqfZ6/OjhDEAr9FmIaDyF0xEUFoYXjmCW2vtCk6+HLMTFQnwsxMdCfCzEx0J8LMTHQnwsxMdCfCzEx0J8LMSnFUqzC0slpffo4QxgPIWV8YUTFsJiIb5TodUWmnw9bAsdFmJiIT4W4mMhPhbiYyE+FuJjIT4W4mMhPhbiYyE+FuJjIT4W4mMhPhbiO7/ry/zCEdy5x0JILMTHQnwsxMdCfCzEx0J8LMTHQnwsxMdCfCzEx0J8LMTHQnwsxDe2wkePZginp86b/lx9vhsB13jOoflvfxhDYaCMfBnSiN5oxUJcLMTHQnwsxMdCfCzEx0J8LMTHQnwsxMdCfCzEx0J8LMTHQnynQscxvdD8c2h+oaPMLpxHTuoZ/WwTFuJiIT4W4mMhPhbiYyE+FuJjIT4W4mMhPhbiYyE+FuJjIT4W4mMhPhbi+1eYBCo0ujBmISwW4mMhPhbiYyE+FuLTC9WjhzOAY+EicZrAKl3zKFcqK6vEKglSL2x7jePKXBTtOVwtPT/P/UcPZwh5LsP3/SwNlBSpYyA/F/tZulhbZVGUloGKsHizK/G8ybIoymzzZPa73Wy24mVbVbtdNTFP21RV299/AGH/jLhAxXQOAAAAAElFTkSuQmCC' },
            filters: { blur: { isOn: true, intensity: 0.33 }, sepia: { isOn: false }, vintage: { isOn: false } }
        };
        store = mockStore(() => state);
        store.replaceReducer(reducer);

        store.dispatch = jest.fn();
    });


    it('should render buttons', () => {
        wrapper = render(
            (<Provider store={store}>
                <DownloadImage />
            </Provider>));
        expect(wrapper.container.querySelectorAll('button').length).toBeGreaterThan(0);
    });
});