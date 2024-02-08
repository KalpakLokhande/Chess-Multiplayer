import React, { useEffect, useState } from 'react'
import Square from './Square'
import Game from './Game'

const Board = () => {

  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  const [squares, setSquares] = useState(Game.getSquares())

  const showMoves = (square, possibleMoves) => {

    const updatedSquares = [...squares]

    updatedSquares.map((newSquare) => {

      if (newSquare.piece) {

        newSquare.highlight = (newSquare.id === square.id)

      }

    })

    for (let i = 0; i < possibleMoves.length; i++) {

      let skip = false

      for (let j = 0; j < possibleMoves[i].length; j++) {

        let index = 64 - (parseInt(possibleMoves[i][j].charAt(1)) * 8) + (possibleMoves[i][j].charCodeAt(0) - 65)

        if (updatedSquares[index] && (possibleMoves[i][j].charCodeAt(0) >= 65 && possibleMoves[i][j].charCodeAt(0) <= 72)) {

          if (updatedSquares[index].piece && updatedSquares[index].piece.id.charAt(0) === square.piece.id.charAt(0)) break;
          else if (updatedSquares[index].piece && updatedSquares[index].piece.id.charAt(0) !== square.piece.id.charAt(0)) {

            if (!skip) {
              updatedSquares[index].isPossibleCapture = true
              skip = true
            }

          }
          else {
            updatedSquares[index].isPossibleMove = true

          }


        }

      }

    }

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
