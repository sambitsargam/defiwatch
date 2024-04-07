import React from 'react';

const Loading = () => (
  <div style={{ position: 'fixed', top: '50%', left: '50%' }}>
    <div
      className="spinner-border"
      role="status"
      style={{
        color: '#7888fc',
        display: 'inline-block',
        width: '2rem',
        height: '2rem',
        verticalAlign: '-.125em',
        border: '.25em solid currentColor',
        borderRightColor: 'transparent',
        borderRadius: '50%',
        animation: '.75s linear infinite spinner-border',
      }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

export default Loading;
