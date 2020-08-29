import React from 'react'
import './style.css'
import Button from '../Button/Button.js'

const TwoButton = (props) => (
  <div>
    <p className={props.className}>{props.p}</p>
    <div>
      <Button
        className={props.classNamePrimary}
        name={props.namePrimary}
        onClick={props.onClickPrimary}
      />
      <Button
        className={props.classNameSecond}
        name={props.nameSecond}
        onClick={props.onClickSecond}
      />
    </div>
  </div>
)

export default TwoButton
