import React from 'react';

const TextInput = ({
  changeFunc,
  name,
  placeholder,
  value,
  customClass = '',
}) => {
  return (
    <input
      onChange={e => typeof changeFunc === 'function' && changeFunc(e)}
      type="text"
      name={name}
      id={`input${name}`}
      className={`form-control ${customClass}`}
      placeholder={placeholder}
      required
      autoFocus
      value={value}
    />
  );
};

export default TextInput;
