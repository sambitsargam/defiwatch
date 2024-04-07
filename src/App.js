import React from 'react';
import Routing from './Components/Routing';
import { HashRouter } from 'react-router-dom';

const App = () => {
  return (
    <HashRouter>
      <Routing />
    </HashRouter>
  );
};

export default App;
