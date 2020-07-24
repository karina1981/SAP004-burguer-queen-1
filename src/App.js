import React from 'react';
import Background from './components/Background/Background.js';
import './style.css';
// import firebase from './firebase';

const App = () => {
  return (
    <main>
      <Background
        idPrimary="button"
        classNamePrimary="login"
        namePrimary="Login"
        idSecond="button"
        classNameSecond="registro"
        nameSecond="Registro"
      />
      <form>
        <input
          id="email"
          type="email"
          className="email"
          placeholder="digite seu email"
        />
        Email
        <input
          id="password"
          type="password"
          minlength="6"
          className="senha"
          placeholder="minimo de 6 digitos"
        />
        Senha
      </form>
    </main>
  );
};

export default App;
