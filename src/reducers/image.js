import {
    IMAGE_UPLOAD
  } from '../constants/actionTypes';
  
  export default (state = {}, action) => {
    switch (action.type) {
      case IMAGE_UPLOAD:
        return {
          ...state,
          file: action.payload.file
        };
      default:
        return state;
    }
  };
  