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

    if (response?.message) {
      setErrorMessage(response.message);
      $('#login-error').removeClass('d-none').addClass('show');
    } else {
      //   localStorage.setItem(constants.accessToken, user.accessToken);
      //
      //   this.setState({
      //     currentUser: {
      //       id: user.id,
      //       userName: user.username,
      //       cn: user.cn,
      //       ruoli: [...user.roles],
      //     },
      //     isAuthenticated: true
      //   });
      //
      //   this.props.history.push(routes.urls.home);

      localStorage.setItem(constants.accessToken, response?.accessToken);

      store.dispatch(actions.setUser({}));

      history.push(routes.urls.home);
    }
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <div className="login-form">
        <form className="form-signin" onSubmit={e => handleSubmit(e)}>
          <div
            id="login-error"
            className="alert alert-danger alert-dismissible d-none"
          >
            <button
              type="button"
              className="close"
              onClick={() =>
                $('#login-error').addClass('d-none').removeClass('show')
              }
            >
              &times;
            </button>
            <strong>Errore!</strong> {errorMessage}
          </div>

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
      </div>
    </div>
  );
};

export default Login;
