import Piece from './Piece'
import Moves from './Moves'
import Game from './Game'

const Square = (props) => {

  const getPossibleMoves = () => {

    let possibleMoves = []

    if (props.isPossibleMove) {

      Game.movePiece(props.activeSquare,
        props,
        props.squares,
        props.castling,
        props.setCastling,
        props.setEnPassant,
        props.setHalfMoveClock,
        props.setFullMoveNumber,
        props.setActiveSquare,
        props.setCurrentPlayer,
        props.currentPlayer,
        props.setSquares)

    } else if (props.isPossibleCapture) {

      Game.capturePiece(props.activeSquare,props, props.squares, props.enPassant, props.setActiveSquare, props.setHalfMoveClock, props.setFullMoveNumber, props.setSquares, props.currentPlayer, props.setCurrentPlayer)

    } else if (props.piece && props.currentPlayer === props.piece.id.charAt(0) && props.piece.id.charAt(0) === props.onBottom) {

      console.log(props)
      possibleMoves = Moves.getMoves(props.squares[props.index], props.squares, props.enPassant)
      props.handleClick(props, props.squares, possibleMoves, props.enPassant)

    }


  }

  return (
    <div id={props.id} style={{ rotate: props.onBottom === 'w' ? '0deg' : '180deg' }} className={`square ${props.isDark ? 'dark' : 'light'} ${props.highlight ? 'highlight' : ''}`} onClick={getPossibleMoves}>

      {props.isPossibleMove && <svg viewBox='0 0 80 80' style={{ zIndex: -10 }}> <circle r={10} cx={40} cy={40} fill='rgba(0,0,0,0.2)'></circle> </svg>}
      {/* {props.isPossibleCapture && <svg viewBox={`0 0 80 80 `} style={{ position:'absolute', top: document.getElementById(props.id).getBoundingClientRect().top, left: document.getElementById(props.id).getBoundingClientRect().left, width: '80px', height: '80px' }}> <circle r={35} cx={40} cy={40} stroke='rgba(0,0,0,0.2)' fill='rgba(0,0,0,0)' strokeWidth={5} ></circle> </svg>} */}
      {props.isPossibleCapture && <svg viewBox={`0 0 80 80 `} style={{ position: 'absolute', top: 0, left: 0, width: '80px', height: '80px' }}> <circle r={35} cx={40} cy={40} stroke='rgba(0,0,0,0.2)' fill='rgba(0,0,0,0)' strokeWidth={5} ></circle> </svg>}

      {props.piece && <Piece id={props.piece}></Piece>}

    </div>
  )
}

export default Square
