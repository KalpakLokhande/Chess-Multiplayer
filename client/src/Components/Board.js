import React, { useEffect, useState } from 'react'
import Square from './Square'
import Game from './Game'
import Moves from './Moves'

const Board = () => {

  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
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

    for (let i = 0; i < possibleMoves[1].length; i++) {

      possibleMoves[1][i].isPossibleCapture = true

    }
    for (let i = 0; i < possibleMoves[0].length; i++) {

      possibleMoves[0][i].isPossibleMove = true

    }

    // for (let i = 0; i < possibleMoves.length; i++) {

    //   let skip = false

    //   for (let j = 0; j < possibleMoves[i].length; j++) {

    //     let index = 64 - (parseInt(possibleMoves[i][j].charAt(1)) * 8) + (possibleMoves[i][j].charCodeAt(0) - 65)

    //     if (updatedSquares[index] && (possibleMoves[i][j].charCodeAt(0) >= 65 && possibleMoves[i][j].charCodeAt(0) <= 72 && parseInt(possibleMoves[i][j].substring(1)) >= 1 && parseInt(possibleMoves[i][j].substring(1)) <= 8)) {

    //       if (updatedSquares[index].piece && updatedSquares[index].piece.charAt(0) === square.piece.charAt(0)) break;
    //       else if (updatedSquares[index].piece && updatedSquares[index].piece.charAt(0) !== square.piece.charAt(0)) {
    //         if (isCheck.length > 0) {

    //           console.log(isCheck[1].id)
    //           if (updatedSquares[index].id === isCheck[1].id) updatedSquares[index].isPossibleCapture = true

    //         }
    //         else if (!skip) {
    //           updatedSquares[index].isPossibleCapture = true
    //           skip = true
    //         }

    //       } else {

    //         if (isCheck.length > 0) {

    //           for (let k = 0; k < isCheck[0].length; k++) {

    //             if (updatedSquares[index].id === isCheck[0]) updatedSquares[index].isPossibleMove = true

    //           }

    //         }else{

    //           updatedSquares[index].isPossibleMove = true

    //         }

    //       }

    //     }

    //   }

    // }

    // setSquares(updatedSquares)

  }

  const movePiece = (newSquare) => {

    let temp = activeSquare.piece
    squares[newSquare.index].piece = temp
    squares[activeSquare.index].piece = ''

    checkForCheck()

    setActiveSquare('')
    resetState()
    swapCurrentPlayer()

  }

  const capturePiece = (newSquare) => {

    let temp = activeSquare.piece
    squares[newSquare.index].piece = temp
    squares[activeSquare.index].piece = ''

    checkForCheck()

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

  const checkForCheck = () => {

    let possibleMoves = Moves.getAllPossibleMoves(squares, currentPlayer)

    for(let i = 0; i < possibleMoves[1].length; i++){

      if(possibleMoves[1][i].piece && possibleMoves[1][i].piece.charAt(1) === 'k') console.log('check')

    }

  }

  // const checkForCheckMate = () => {

  //   let nextPlayer = currentPlayer === 'w' ? 'b' : 'w'

  //   let possibleMoves = Moves.getAllPossibleMoves(squares, nextPlayer)

  //   console.log(possibleMoves)

  // }

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
