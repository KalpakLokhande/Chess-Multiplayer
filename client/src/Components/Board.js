import React, { useEffect, useState } from 'react'
import Square from './Square'
import Game from './Game'
import Moves from './Moves'

const Board = () => {

  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')
  // const [FEN, setFEN] = useState('8/3r3k/NP1p4/p2QP1P1/1BB3Pp/1R4n1/6K1/5R2')
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

    let currentPlayerPieces = []

    squares.forEach(square => {
      if(square.piece && square.piece[0] === currentPlayer) currentPlayerPieces.push(square)
    })

    let AllPossibleMoves = []

    currentPlayerPieces.forEach(piece => {

      let possibleMoves = Moves.getMoves(piece,squares)
      let originSquare = squares[piece.index]
      let originPiece = squares[piece.index].piece

      for(let i = 0; i < possibleMoves[0].length; i++){

        originSquare.piece = ''
        possibleMoves[0][i].piece = originPiece
        let check = Moves.getAllPossibleMoves(squares,currentPlayer === 'w' ? 'b' : 'w')

        if(!check[1].some(sq => sq.piece === currentPlayer + 'k')) AllPossibleMoves.push(possibleMoves[0][i])

        possibleMoves[0][i].piece = ''
        originSquare.piece = originPiece
      }

      for(let i = 0; i < possibleMoves[1].length; i++){

        let temp = possibleMoves[1][i].piece
        originSquare.piece = ''
        possibleMoves[1][i].piece = originPiece
        let check = Moves.getAllPossibleMoves(squares,currentPlayer === 'w' ? 'b' : 'w')

        if(!check[1].some(sq => sq.piece === currentPlayer + 'k')) AllPossibleMoves.push(possibleMoves[1][i])

        possibleMoves[1][i].piece = temp
        originSquare.piece = originPiece

      }

    })

    if(AllPossibleMoves.length !== 0) return false
    return true

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

    if(checkForMate())console.log("CheckMate!") 

  },[squares])


  return (
    <div className='board' >
      {renderSquares()}
    </div>
  )
}

export default Board
