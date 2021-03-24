import React from 'react';

const NavButton = props => {
  return (
    <button
      type="button"
      id={props.id}
      className={props.className}
      tabIndex="-1"
      onClick={props.callback}
    >
      {props.label}
    </button>
  );
};

export default NavButton;
