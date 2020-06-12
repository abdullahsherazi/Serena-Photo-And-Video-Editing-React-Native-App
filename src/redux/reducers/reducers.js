import * as actionTypes from '../actions/types';

const initialState = {
  loading: false,
  photos: [],
  videos: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.NOT_LOADING:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.SET_PHOTOS:
      console.log('PHOTOS', action.payload);
      return {
        ...state,
        photos: action.payload,
      };
    case actionTypes.SET_VIDEOS:
      console.log('VIDEOS', action.payload);
      return {
        ...state,
        videos: action.payload,
      };
    default:
      return state;
  }
}
