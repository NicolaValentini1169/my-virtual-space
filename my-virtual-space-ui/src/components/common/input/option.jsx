import React from 'react';

const OptionInput = ({ name, changeFunc, list, field, selected }) => {
  return (
    <select
      className="custom-select"
      name={name}
      onChange={e => typeof changeFunc === 'function' && changeFunc(e)}
    >
      <option value="" selected disabled hidden>
        Choose here
      </option>
      {list?.map(obj => (
        <option value={obj.id} selected={selected === obj.id}>
          {obj[field]}
        </option>
      ))}
    </select>
  );
};

export default OptionInput;
