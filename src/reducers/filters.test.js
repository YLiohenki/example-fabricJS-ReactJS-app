import filters from './filters.js';
import { FILTER_CHANGE } from '../constants/actionTypes.js';

describe('filters reducer', () => {
    it('should save filters in state on FILTER_CHANGE', () => {
        var result = filters({}, { type: FILTER_CHANGE, payload: { blur: { isOn: true, intensity: 0.33 }, sepia: { isOn: false, intensity: 0.00 }, vintage: { isOn: false, intensity: 0.66 } } });
        expect(result.blur.intensity).toEqual(0.33);
        expect(result.vintage.isOn).toEqual(false);
        expect(result.sepia.intensity).toEqual(0.00);
    });
});