import React from 'react';
import style from './InputField.module.css'; // Create a separate CSS file for styling

const InputWithIcon = ({
  value,
  onChange,
  icon,
  title,
  required,
  topStyle = {},
  placeholder,
  ...rest
}) => {
  return (
    <div style={topStyle}>
      <p className={style.title}>
        {title} {required && <span className="required"> *</span>}
      </p>
      <div className={style.inputField}>
       
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={style.input}
          placeholder={placeholder}
          {...rest}
        />
         {icon && (
          <div className={style.icon}>
           {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputWithIcon;
