import React from 'react';
import './App.css';
import DelegateList from './components/DelegateList';

function App() {
  return (
    <div className="App">
        <div class="row header">
            <div class="col-3 name-page">Uniswap Governance</div>
            <div class="col-6 nav">
                <div class="delegate-nav">Delegates</div>
                <div class="ap-nav">Autonomous Proposals</div>
            </div>
            <div class="col-3"></div>
        </div>
        <div class="hero" />
        <DelegateList />
    </div>
  );
}

export default App;
