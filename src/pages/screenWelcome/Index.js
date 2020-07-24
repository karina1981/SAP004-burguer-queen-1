import React from 'react';
import Background from './components/Background/Background.js';
import logo from './imagens/logo.png';
import './style.css';
// import firebase from './firebase';

const Index = () => {
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
      <div>
        <img src={logo} alt={'fundo imagem'} className="logotipo"></img>
      </div>
      <section>
        <p className="welcome">Bem vindo CK Lover!</p>
        <p className="message">
          Entre com seu email e senha em Login ou Registre um novo usuário!
        </p>
      </section>
    </main>
  );
};

export default Index;
