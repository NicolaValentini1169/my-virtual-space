import actionTypes from './actionTypes';

const setUser = (user = null) => ({
  type: actionTypes.SETUSER,
  payload: {
    user,
  },
});

const actions = {
  setUser,
};

export default actions;
