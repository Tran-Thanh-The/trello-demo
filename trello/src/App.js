import React from 'react';

import AppBar from 'components/AppBar/AppBar';
import BroadBar from 'components/BroadBar/BroadBar';
import BroadContent from 'components/BroadContent/BroadContent';

import './App.scss';

function App() {
  return (
    <div className="App">
      <AppBar />
      <BroadBar />
      <BroadContent />
    </div>
  );
}

export default App;
