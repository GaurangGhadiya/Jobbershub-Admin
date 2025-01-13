import React from 'react';

const DropdownComponent = ({
  value = '', // Default value
  onChange,
  options = [], // Dropdown options
  placeholder = 'Select an option', // Default placeholder
  className = '', // Default empty className
  style = {}, // Inline styles
  ...props
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`select-dropdown ${className}`} // Add custom className
      style={{
        padding: '10px 8px',
        fontSize: '16px',
        border: '1px solid #C9D4F0',
        borderRadius: '10px',
        width: '100%',
        outline: 'none', // Removes focus border
        ...style, // Merge custom styles
      }}
      {...props} // Spread additional props
    >
      {/* Placeholder */}
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {/* Render options */}
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownComponent;
