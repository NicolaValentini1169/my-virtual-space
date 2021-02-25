import React from 'react';
import $ from 'jquery';

const NavButton = props => {
    return (
        <button
            type="button"
            id={props.id}
            className={props.className}
            tabIndex="-1"
            onClick={() => {
                props.history.push({
                    pathname: props.to,
                    state: props.state,
                });
                $('.nav-link, .dropdown-toggle').removeClass('active');
                $('#' + props.id).addClass('active');

            }}
        >
            {props.label}
        </button>
    );
};

export default NavButton;
