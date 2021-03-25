import authApi from './authApi';
import constants from '../../constants.json';
import store from '../../redux/store';
import actions from '../../redux/actions';

export const handleSignIn = async (credential, callback) =>
  handleResponse(await authApi.signIn(credential), callback);

export const handleSignUp = async (credential, callback) =>
  handleResponse(await authApi.signUp(credential), callback);

export const handleSignOut = () => {
  deleteToken();
  deleteCurrentUser();
};

const handleResponse = response => {
  if (response?.accessToken) {
    setToken(response.accessToken);
    setCurrentUser(response?.jwtUserDetail);
  } else return response?.data?.message;
};

export const setToken = token => {
  localStorage.setItem(constants.accessToken, token);
};

export const deleteToken = () => {
  localStorage.removeItem(constants.accessToken);
};

export const setCurrentUser = user => {
  store.dispatch(
    actions.setUser({
      id: user?.id,
      username: user?.username,
      roles: user?.authorities,
    }),
  );
};

export const deleteCurrentUser = () => {
  store.dispatch(actions.setUser(null));
};
