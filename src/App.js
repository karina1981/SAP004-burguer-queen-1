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
        <section>
          <p className="welcome">Bem vindo CK Lover!</p>
          <p className="login">
            Entre com seu email e senha em Login ou
            <br />
            Registre um novo usuário!
          </p>
          <p className="trouble">
            Problemas com seu login?
            <br />
            Clique aqui!
          </p>
        </section>

        <div>
          <Button name="Login" className="login" />
          <Button name="Registro" className="registro" />
        </div>
      </div>
    </main>
  );
};

export default App;
