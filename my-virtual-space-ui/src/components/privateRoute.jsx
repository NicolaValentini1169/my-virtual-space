import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import routes from '../routes';
import constants from '../constants';
import {toast} from 'react-toastify';

const checkProfileForRoute = (path) => {
    let hasPermission = false;

    if (localStorage.getItem(constants.accessToken)) {
        // let jwt = jwtDecode(localStorage.getItem(constants.accessToken));

        if (path === routes.home) {
            hasPermission = true;
        }
    }

    return hasPermission;
};

const PrivateRoute = ({
                          name,
                          path,
                          exact,
                          component: Component,
                          isModifica,
                          ...rest
                      }) => {
    return (
        <Route
            path={path}
            exact
            render={props =>
                checkProfileForRoute(path, isModifica) ? (
                    <Component {...rest} {...props} />
                ) : (
                    <Redirect
                        to={
                            localStorage.getItem(constants.accessToken)
                                ? toast.error(constants.noAuthorization) && routes.home
                                : routes.login
                        }
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
