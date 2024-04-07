import React, { useState } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';

const TextInput = ({
  label = 'Enter wallet address',
  handleSubmit,
  icon,
  autoFocus = false,
  style,
}) => {
  const { currentTheme } = useThemeSwitcher();

  const [text, setText] = useState('');
  const handleKeypress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(text);
    }
  };
  return (
    <div className="input-group flex-nowrap" style={{ ...style }}>
      <input
        type="text"
        className="form-control accordion-flush"
        placeholder={label}
        aria-label={label}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeypress}
        autoFocus={autoFocus}
      />
      <button
        className="input-group-text nav-link search-icon px-2"
        aria-expanded="false"
        style={{
          backgroundColor: currentTheme === 'dark' ? '#2B3B52' : '#fff',
        }}
        onClick={() => handleSubmit(text)}
      >
        {icon}
      </button>
    </div>
  );
};

export default TextInput;
