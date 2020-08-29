import React from 'react'
import './style.css'

const Button = (props) => {
  return (
    <button
      id="button"
      className={props.className}
      name={props.name}
      onClick={props.onClick}
    ></button>
  )
}

export default Button
