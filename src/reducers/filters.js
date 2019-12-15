import {
    FILTER_CHANGE
} from '../constants/actionTypes';
import {
    FILTER_TYPES
} from '../constants/filterTypes';

export default (state = { [FILTER_TYPES[0].key]: { isOn: false, intensity: 0 }, [FILTER_TYPES[1].key]: { isOn: false, intensity: 0 }, [FILTER_TYPES[2].key]: { isOn: false, intensity: 0 } }, action) => {
    switch (action.type) {
        case FILTER_CHANGE:
            return {
                ...state,
                [FILTER_TYPES[0].key]: action.payload[FILTER_TYPES[0].key],
                [FILTER_TYPES[1].key]: action.payload[FILTER_TYPES[1].key],
                [FILTER_TYPES[2].key]: action.payload[FILTER_TYPES[2].key]
            };
        default:
            return state;
    }
};
