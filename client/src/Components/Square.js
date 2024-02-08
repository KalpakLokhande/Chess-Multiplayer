import { useEffect, useState } from 'react'
import Piece from './Piece'
import Moves from './Moves'

const Square = (props) => {

  const [highlight, setHighlight] = useState('')

  const getPossibleMoves = () => {

    let possibleMoves = []

    if (props.isPossibleMove) {

      console.log('move!')

    } else if (props.isPossibleCapture) {

      console.log('Capture!')

    } else if(props.piece){

      possibleMoves = Moves.getMoves(props)

      props.handleClick(props, possibleMoves)

    }

  }

  useEffect(() => {

    setHighlight(props.highlight)

  }, [props.highlight])

  return (
    <div className={`square ${props.isDark ? 'dark' : 'light'} ${highlight ? 'highlight' : ''}`} onClick={getPossibleMoves}>

      {props.isPossibleMove && <svg viewBox='0 0 80 80' style={{ zIndex: -10 }}> <circle r={10} cx={40} cy={40} fill='rgba(0,0,0,0.2)'></circle> </svg>}
      {props.isPossibleCapture && <svg viewBox={`0 0 80 80 `} style={{ position: 'absolute', top: document.getElementById(props.id).getBoundingClientRect().top, left: document.getElementById(props.id).getBoundingClientRect().left, width: '80px', height: '80px' }}> <circle r={35} cx={40} cy={40} stroke='rgba(0,0,0,0.2)' fill='rgba(0,0,0,0)' strokeWidth={5} ></circle> </svg>}
      {props.piece && <Piece id={props.piece}></Piece>}

    </div>
  )
}

export default Square
