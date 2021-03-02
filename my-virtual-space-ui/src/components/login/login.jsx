import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import constants from '../../constants.json';
import LoadingSpinner from '../common/loadingSpinner';
import "./login.css";

const Login = props => {
    const [credential, setCredential] = useState({});

    const handleSubmit = e => {
        e.preventDefault();

        if (e.nativeEvent.submitter.name === constants.login) {
            props.onLogin(credential);
        } else if (e.nativeEvent.submitter.name === constants.registration) {
            props.onRegistration(credential);
        }
    };

    const handleChange = ({currentTarget: input}) => {
        setCredential({...credential, [input.name]: input.value});
    };

    useEffect(() => {
        // if (localStorage.getItem(constants.accessToken)) {
        //     toast.info(
        //         'Sei già autenticato ' +
        //         jwtDecode(localStorage.getItem(constants.accessToken)).cn +
        //         '!',
        //     );
        //     props.history.replace(routes.urls.home);
        // }
    }, [props])

    return props.loading ? (
        <LoadingSpinner/>
    ) : (
        <div>
            <div className="login-form">
                <form className="form-signin" onSubmit={e => handleSubmit(e)}>
                    <div
                        id="network-error"
                        className="alert alert-danger alert-dismissible d-none"
                    >
                        <button
                            type="button"
                            className="close"
                            onClick={() =>
                                $('#network-error').addClass('d-none').removeClass('show')
                            }
                        >
                            &times;
                        </button>
                        <strong>Errore di Rete!</strong> Siamo spiacenti.
                    </div>

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
                        <strong>Errore!</strong> Nickname o Password errati.
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
}

export default Login;
