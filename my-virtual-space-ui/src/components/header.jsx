import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(state => state?.user);

  return (
    user && (
      <div className="header font-magneto">
        <p className="mb-0 d-flex align-items-end header float-left">
          My virtual Space
        </p>
        <p className="mb-0 d-flex align-items-end header float-right">
          Dr.Niar
          <button
            type="button"
            onClick={() => {}} // TODO SISTEMARE QUI ON LOGOUT
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
