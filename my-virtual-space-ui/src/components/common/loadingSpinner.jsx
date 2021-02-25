import React from 'react';

const LoadingSpinner = props => {
  return (
    <div
      className={`sk-folding-cube ${
        props.customClass ? props.customClass : ''
      }`}
    >
      <div className="sk-cube1 sk-cube" />
      <div className="sk-cube2 sk-cube" />
      <div className="sk-cube4 sk-cube" />
      <div className="sk-cube3 sk-cube" />
    </div>
  );
};

export default LoadingSpinner;
