import React from "react";

const Header = ({onLogout}) => {
    return (
        <div className='header'>
            <p className='mb-0 d-flex align-items-end header float-left'>My virtual Space</p>
            <p className='mb-0 d-flex align-items-end header float-right'>Dr.Niar
                <button
                    type="button"
                    onClick={() => onLogout()}
                    className="btn mb-1 ml-2 btn-outline-mvs-color"
                >
                    <span className="fa fa-sign-out"/>
                </button>
            </p>
        </div>);
}

export default Header;