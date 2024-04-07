import React from 'react';

const NotFound = () => {
  return (
    <div className="error-page err-404 h-100">
      <div className="container">
        <div className="error-container">
          <div className="error-info">
            <h1>404</h1>
            <p>
              It seems that the page you are looking for no longer exists.
              <br />
              Please contact our <a href="/contact">help center</a> or go to the{' '}
              <a href="/dashboard">homepage</a>.
            </p>
          </div>
          <div className="error-image"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
