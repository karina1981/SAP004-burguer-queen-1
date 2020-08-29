import React from 'react'
import './style.css'
import Button from '../Button/Button.js'

const FourButton = (props) => (
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
      <Button
        className={props.classNameThird}
        name={props.nameThird}
        onClick={props.onClickThird}
      />
      <Button
        className={props.classNameFourth}
        name={props.nameFourth}
        onClick={props.onClickFourth}
      />
    </div>
  </div>
)

export default FourButton
