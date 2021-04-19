import React from 'react';
import './box.css';

const Box = ({ title, content }) => {
  return (
    <div className="box">
      <h4 className="title">{title}</h4>
      <div className="body">{content}</div>
    </div>
  );
};

export default Box;
