import React from 'react';

const IconButton = ({ func, title, icon, customClass = '' }) => {
  return (
    <button
      type="button"
      className={`btn p-0 pl-1 pr-1 border-0 shadow-none ${customClass}`}
      onClick={() => typeof func === 'function' && func()}
      data-toggle="tooltip"
      data-placement="bottom"
      title={title}
      data-original-title={title}
    >
      <span className={`fa fa-${icon}`} />
    </button>
  );
};

export default IconButton;
