import React, { useState } from 'react';
import $ from 'jquery';
import constants from '../../constants.json';
import routes from '../../routes.json';
import LoadingSpinner from '../common/loadingSpinner';
import './login.css';
import authApi from './authApi';
import store from '../../redux/store';
import actions from '../../redux/actions';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [credential, setCredential] = useState({});
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (e.nativeEvent.submitter.name === constants.login) {
      handleLogin(credential);
    } else if (e.nativeEvent.submitter.name === constants.registration) {
      // props.onRegistration(credential);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setCredential({ ...credential, [input.name]: input.value });
  };

  // useEffect(() => {
  //   // if (localStorage.getItem(constants.accessToken)) {
  //   //     toast.info(
  //   //         'Sei già autenticato ' +
  //   //         jwtDecode(localStorage.getItem(constants.accessToken)).cn +
  //   //         '!',
  //   //     );
  //   //     props.history.replace(routes.urls.home);
  //   // }
  // }, [props]);

  const handleLogin = async () => {
    setLoading(true);

    const response = await authApi.signIn(credential);

    setLoading(false);

    if (response?.accessToken) {
      localStorage.setItem(constants.accessToken, response.accessToken);

      store.dispatch(
        actions.setUser({
          id: response?.jwtUserDetail?.id,
          username: response?.jwtUserDetail?.username,
          roles: response?.jwtUserDetail?.authorities,
        }),
      );

      history.push(routes.urls.home);
    } else {
      setErrorMessage(response?.data?.message);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="login-form">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <form className="form-signin" onSubmit={e => handleSubmit(e)}>
          {showErrorModal && (
            <div
              className="alert alert-danger alert-dismissible clickable"
              onClick={() => setShowErrorModal(false)}
            >
              <strong>Errore!</strong> {errorMessage}
            </div>
          )}

          <div className="text-center mb-4">
            <h1 className="h3 mb-3 font-weight-normal">
              Accedi a My Virtual Space
            </h1>
          </div>

          <div className="form-label-group">
            <input
              onChange={handleChange}
              type="text"
              name="username"
              id="inputUsername"
              className="form-control"
              placeholder="Nickname"
              required
              autoFocus
            />
            <label htmlFor="inputUsername">Nickname</label>
          </div>

          <div className="form-label-group">
            <input
              onChange={handleChange}
              type="password"
              name="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required
            />
            <label htmlFor="inputPassword">Password</label>
          </div>

          <div>
            <button
              id={constants.registration}
              name={constants.registration}
              className="btn btn-lg btn-my-virtual-space-color float-left w-49-5"
              type="submit"
            >
              {constants.registration}
            </button>

            <button
              id={constants.login}
              name={constants.login}
              className="btn btn-lg btn-my-virtual-space-color float-right w-49-5"
              type="submit"
            >
              {constants.login}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
