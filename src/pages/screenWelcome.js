import React from 'react';
import Background from './components/Background/Background.js';
import Button from './components/Button/Button.js';
import Logo from './components/Logo/Logo.js';
import './style.css';
// import firebase from './firebase';

const App = () => {
  return (
    <main>
      <Background />
      <div>
        <div>
          <Logo />
        </div>
        <Button name="Login" className="login" />
        <Button name="Registro" className="registro" />
      </div>
    </main>
  );
};

export default App;
