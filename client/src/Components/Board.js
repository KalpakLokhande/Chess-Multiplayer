import React, { useEffect, useState } from 'react'
import Square from './Square'
import Game from './Game'
import Moves from './Moves'

const Board = () => {

  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  // const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/5P2/8/8/PPPPPPPP/RNBQKBNR')

  const [squares, setSquares] = useState(Game.getSquares())
  const [activeSquare, setActiveSquare] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState('w')
  const [enPassant, setEnPassant] = useState(null)

  const showMoves = (square, possibleMoves, enPassant) => {

    resetState()

    setActiveSquare(square)
    const updatedSquares = [...squares]

    updatedSquares.forEach((newSquare) => {

      if (newSquare.piece) {

        newSquare.highlight = (newSquare.id === square.id)

      }

    })

    const moves = Moves.getLegalMoves(square, possibleMoves, squares, enPassant)

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

    if (activeSquare.piece.charAt(1).toLowerCase() === 'p' && (activeSquare.id.charAt(1) === '2' || activeSquare.id.charAt(1) === '7') && (newSquare.id.charAt(1) === '4' || newSquare.id.charAt(1) === '5')) {

      Game.checkEnPassant(squares, newSquare, setEnPassant)

    } else {

      setEnPassant(null)

    }

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
          enPassant={enPassant}
          movePiece={movePiece}
          capturePiece={capturePiece}
          handleClick={showMoves}>
        </Square>
      )

    })

  }

  useEffect(() => {

    setSquares(Game.readFEN(squares, FEN))

  }, [FEN])

  useEffect(() => {

    if (Game.checkForMate(squares, currentPlayer, enPassant)) console.log("CheckMate!")


  }, [squares])


  return (
    <div className='board' >
      {renderSquares()}
    </div>
  )
}

export default Board
