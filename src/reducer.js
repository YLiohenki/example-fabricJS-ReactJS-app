import image from './reducers/image';
import filters from './reducers/filters';
import { combineReducers } from 'redux';

export default combineReducers({
    image,
    filters
});
