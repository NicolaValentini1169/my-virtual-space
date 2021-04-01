import authApi from '../api/authApi';
import constants from '../constants.json';
import store from '../redux/store';
import actions from '../redux/actions';
import jwtDecode from 'jwt-decode';

export const handleSignIn = async credential =>
  handleResponse(await authApi.signIn(credential));

export const handleSignUp = async credential =>
  handleResponse(await authApi.signUp(credential));

export const handleCheckToken = async () =>
  handleResponse(await authApi.checkToken());

export const handleSignOut = () => {
  deleteToken();
  deleteCurrentUser();
};

const handleResponse = response => {
  if (response && response?.status !== 400) {
    setToken(response);
    setCurrentUser(response);
  } else return response?.data || constants.apiError.networkError;
};

export const setToken = token => {
  localStorage.setItem(constants.accessToken, token);
};

export const deleteToken = () => {
  localStorage.removeItem(constants.accessToken);
};

export const setCurrentUser = jwt => {
  const user = jwtDecode(jwt);

  store.dispatch(
    actions.setUser({
      id: user?.id,
      username: user?.cn,
      roles: user?.roles,
    }),
  );
};

export const deleteCurrentUser = () => {
  store.dispatch(actions.setUser(null));
};
