import React from 'react'
import background from '../../imagens/background.jpg'
import './style.css'

const Background = (props) => (
  <div>
    <img id="background" src={background} alt="fundo imagem"></img>
    <div>
      <button
        id={props.idPrimary}
        className={
          props.classNamePrimary
            ? props.classNamePrimary + ' buttons'
            : 'buttons'
        }
      >
        {props.namePrimary}
        {props.onClickPrimary}
      </button>
      <button
        id={props.idSecond}
        className={
          props.classNameSecond ? props.classNameSecond + ' buttons' : 'buttons'
        }
      >
        {props.nameSecond}
        {props.onClickSecond}
      </button>
      <p className="trouble">
        Problemas com seu login?
        <br />
        Clique aqui!
      </p>
    </div>
  </div>
)

export default Background
