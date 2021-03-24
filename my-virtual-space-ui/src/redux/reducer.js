import actionTypes from './actionTypes';

export default function reducer(state = { user: null }, action) {
  switch (action.type) {
    case actionTypes.SETUSER: {
      if (action.payload.user !== state.user) {
        return { ...state, user: action.payload.user };
      } else return state;
    }
    default:
      return state;
  }
}
