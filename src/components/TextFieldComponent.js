import React from 'react'

const TextFieldComponent = ({
    type = 'text', // Default type
    value,
    onChange,
    placeholder = 'Enter text', // Default placeholder
    className = '', // Default empty className
    style = {}, // Inline styles
    ...props
}) => {
    return (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${className}`} // Add custom className
          style={{
            padding: '10px 8px',
            fontSize: '16px',
            border: '1px solid #C9D4F0',
            borderRadius: '10px',
            width: '100%',
            ...style, // Merge custom styles
          }}
          {...props} // Spread additional props
        />
      );
}

export default TextFieldComponent
