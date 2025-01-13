import React from 'react';
import style from './Button.module.css'; // Import the CSS file

const GreenBtn = ({ label, onClick, styleType = 'primary', ...rest }) => {
  return (
    <button 
      className={`${style.button} ${style[styleType]}`} 
      onClick={onClick} 
      {...rest}
    >
      {label}
    </button>
  );
};

export default GreenBtn;
