import { SET_RACE_ID } from './actions';

const initialState = {
  raceId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RACE_ID:
      return {
        ...state,
        raceId: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
