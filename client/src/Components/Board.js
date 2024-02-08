import React, { useEffect, useState } from 'react'
import Square from './Square'
import Game from './Game'

const Board = () => {

  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  const [squares, setSquares] = useState(Game.getSquares())
  const [activeSquare,setActiveSquare] = useState('')

  const showMoves = (square, possibleMoves) => {

    resetState()

    setActiveSquare(square)
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

        // console.log(possibleMoves[i][j])

        if (updatedSquares[index] && (possibleMoves[i][j].charCodeAt(0) >= 65 && possibleMoves[i][j].charCodeAt(0) <= 72 && parseInt(possibleMoves[i][j].substring(1)) >= 1 && parseInt(possibleMoves[i][j].substring(1)) <= 8)) {

          console.log(index)
          if (updatedSquares[index].piece && updatedSquares[index].piece.charAt(0) === square.piece.charAt(0)) break;
          else if (updatedSquares[index].piece && updatedSquares[index].piece.charAt(0) !== square.piece.charAt(0)) {

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

  const movePiece = (newSquare) => {

    let temp = activeSquare.piece
    squares[newSquare.index].piece = temp
    squares[activeSquare.index].piece = ''
    setActiveSquare('')
    
    resetState()

  }

  const capturePiece = (newSquare) => {

    let temp = activeSquare.piece
    squares[newSquare.index].piece = temp
    squares[activeSquare.index].piece = ''
    setActiveSquare('')
    
    resetState()

  }

  const resetState = () => {

    let updatedSquares = [...squares]

    updatedSquares.map(square => {

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
