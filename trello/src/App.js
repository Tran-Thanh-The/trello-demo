import React from 'react';

import AppBar from 'components/AppBar/AppBar';
import BroadBar from 'components/BoardBar/BoardBar';
import BroadContent from 'components/BoardContent/BoardContent';

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
