import React from 'react';
import './style.css';

//o id puxa as informações gerais do css e o className puxa a partir do
//className que vc definiu na hora de chamar o componente na pagina
const Button = (props) => (
  <button id="buttons" className={props.className}>
    {props.name}
    {props.onClick}
  </button>
);

export default Button;
