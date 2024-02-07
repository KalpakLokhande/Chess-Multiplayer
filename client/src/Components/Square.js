import React from 'react'
import Piece from './Piece'

const Square = (props) => {

  return (
    <div className={`square ${props.isDark ? 'dark' : 'light'}`}>
      {props.piece && <Piece id={props.piece}></Piece>}
    </div>
  )
}

export default Square
