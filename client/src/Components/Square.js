import Piece from './Piece'
import Moves from './Moves'

const Square = (props) => {

  const getPossibleMoves = () => {

    let possibleMoves = []

    if (props.isPossibleMove) {

      props.movePiece(props)

    } else if (props.isPossibleCapture) {

      props.capturePiece(props)

    } else if (props.piece && props.currentPlayer === props.piece.charAt(0)) {

      possibleMoves = Moves.getMoves(props.squares[props.index], props.squares)
      props.handleClick(props, possibleMoves)

    }

  }

  return (
    <div id={props.id} className={`square ${props.isDark ? 'dark' : 'light'} ${props.highlight ? 'highlight' : ''}`} onClick={getPossibleMoves}>

      {props.isPossibleMove && <svg viewBox='0 0 80 80' style={{ zIndex: -10 }}> <circle r={10} cx={40} cy={40} fill='rgba(0,0,0,0.2)'></circle> </svg>}
      {props.isPossibleCapture && <svg viewBox={`0 0 80 80 `} style={{ position: 'absolute', top: document.getElementById(props.id).getBoundingClientRect().top, left: document.getElementById(props.id).getBoundingClientRect().left, width: '80px', height: '80px' }}> <circle r={35} cx={40} cy={40} stroke='rgba(0,0,0,0.2)' fill='rgba(0,0,0,0)' strokeWidth={5} ></circle> </svg>}
      {props.piece && <Piece id={props.piece}></Piece>}

    </div>
  )
}

export default Square
