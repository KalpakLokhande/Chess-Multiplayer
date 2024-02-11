import React, { useEffect, useState } from 'react'
import Square from './Square'
import Game from './Game'
import Moves from './Moves'

const Board = () => {

  // const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  const [FEN, setFEN] = useState('rn1q2n1/b3k1pr/pp1pB1Qp/2p1p1P1/2P1PP2/5R1P/P2P4/RNB1K3')
  const [squares, setSquares] = useState(Game.getSquares())
  const [activeSquare, setActiveSquare] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState('w')

  const showMoves = (square, possibleMoves) => {

    resetState()

    setActiveSquare(square)
    const updatedSquares = [...squares]

    updatedSquares.forEach((newSquare) => {

      if (newSquare.piece) {

        newSquare.highlight = (newSquare.id === square.id)

      }

    })

    const moves = Moves.getLegalMoves(square, possibleMoves, squares)

    moves[0].forEach(move => {

      move.isPossibleMove = true

    })

    moves[1].forEach(move => {

      move.isPossibleCapture = true

    })

  }

  const movePiece = (newSquare) => {

    let temp = activeSquare.piece
    squares[newSquare.index].piece = temp
    squares[activeSquare.index].piece = ''

    if(checkForMate()) console.log('checkMate!')

    setActiveSquare('')
    resetState()
    swapCurrentPlayer()
  }

  const capturePiece = (newSquare) => {

    let temp = activeSquare.piece
    squares[newSquare.index].piece = temp
    squares[activeSquare.index].piece = ''

    setActiveSquare('')
    resetState()
    swapCurrentPlayer()

  }

  const checkForMate = () => {

    let opp = currentPlayer === 'w' ? 'b' : 'w'
    let pieces = []
    squares.forEach(sq => {

      if(sq.piece && sq.piece.charAt(0) === opp) pieces.push(sq)

    })

    let check = 0

    pieces.forEach(piece => {

      let moves = Moves.getAllPossibleMoves(piece,squares)

      let legalMoves = Moves.getLegalMoves(squares[piece.index],moves,squares)

      if(legalMoves[0].length > 0 && legalMoves[1].length > 0) check++

    })

    if(check === 0) return true
    else return false

  }

  const swapCurrentPlayer = () => {

    setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w')

  }

  const resetState = () => {

    let updatedSquares = [...squares]

    updatedSquares.forEach(square => {

      square.isPossibleCapture = false
      square.isPossibleMove = false
      square.highlight = false

    })
    setSquares(updatedSquares)
  }

  const renderSquares = () => {

    return squares.map(({ id, index, isDark, piece, highlight, isPossibleMove, isPossibleCapture }) => {
      return (
        <Square
          id={id}
          key={id}
          index={index}
          isDark={isDark}
          piece={piece}
          isPossibleMove={isPossibleMove}
          isPossibleCapture={isPossibleCapture}
          highlight={highlight}
          currentPlayer={currentPlayer}
          squares={squares}
          // isCheck={isCheck}
          movePiece={movePiece}
          capturePiece={capturePiece}
          handleClick={showMoves}>
        </Square>
      )

    })

  }

  useEffect(() => {

    setSquares(Game.readFEN(squares, FEN))

  }, [])

  return (
    <div className='board' >
      {renderSquares()}
    </div>
  )
}

export default Board
