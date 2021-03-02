import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import routes from '../routes';
import constants from '../constants';
import {toastError} from "../utils/utils";

const checkProfileForRoute = (path) => {
    let hasPermission = false;

    if (localStorage.getItem(constants.accessToken)) {
        // let jwt = jwtDecode(localStorage.getItem(constants.accessToken));

        hasPermission = true;
        if (path === routes.urls.anime) {
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
                                ? toastError(constants.noAuthorization) && routes.urls.home
                                : routes.urls.login
                        }
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
