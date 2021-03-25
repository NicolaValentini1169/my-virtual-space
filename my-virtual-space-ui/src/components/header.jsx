import React from 'react';
import constants from '../constants.json';
import routes from '../routes.json';
import { handleSignOut } from './login/authUtils';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();

  return (
    localStorage.getItem(constants.accessToken) && (
      <div className="header font-magneto">
        <p className="mb-0 d-flex align-items-end header float-left">
          My virtual Space
        </p>
        <p className="mb-0 d-flex align-items-end header float-right">
          Dr.Niar
          <button
            type="button"
            onClick={() => {
              handleSignOut();
              history.push(routes.urls.login);
            }}
            className="btn mb-1 ml-2 btn-outline-mvs-color btn-log-out"
          >
            <span className="fa fa-sign-out" />
          </button>
        </p>
      </div>
    )
  );
};

export default Header;
