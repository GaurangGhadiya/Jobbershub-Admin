import React from 'react';

const TextAreaComponent = ({
  value,
  onChange,
  placeholder = 'Enter text', // Default placeholder
  className = '', // Default empty className
  rows = 5, // Default rows for the textarea
  style = {}, // Inline styles
  ...props
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`textarea-field ${className}`} // Add custom className
      style={{
        padding: '10px 8px',
        fontSize: '16px',
        border: '1px solid #C9D4F0',
        borderRadius: '10px',
        width: '100%',
        resize: 'vertical', // Allow vertical resizing only
        ...style, // Merge custom styles
      }}
      {...props} // Spread additional props
    />
  );
};

export default TextAreaComponent;
