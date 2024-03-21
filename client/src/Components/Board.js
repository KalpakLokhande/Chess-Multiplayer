import React, { useEffect, useState } from 'react'
import Square from './Square'
import Game from './Game'
import Moves from './Moves'

const Board = (props) => {

  const [activeSquare, setActiveSquare] = useState('')

  const showMoves = (square, squares, possibleMoves, enPassant) => {

    Game.resetState(squares, props.setSquares)

    setActiveSquare(square)
    const updatedSquares = [...squares]

    updatedSquares.forEach((newSquare) => {

      if (newSquare.piece) {

        newSquare.highlight = (newSquare.id === square.id)

      }

    })

    if (square.piece && square.piece.id.charAt(1) === 'k') {

      if (square.piece.id.charAt(0) === 'w') {

        if (props.castling[0]) {

          if (squares[square.index + 1].piece === '' && squares[square.index + 2].piece === '') possibleMoves[0].push(squares[square.index + 2])

        } if (props.castling[1]) {

          if (squares[square.index - 1].piece === '' && squares[square.index - 2].piece === '') possibleMoves[0].push(squares[square.index - 2])

        }

      }

      if (square.piece.id.charAt(0) === 'b') {

        if (props.castling[2]) {

          if (squares[square.index + 1].piece === '' && squares[square.index + 2].piece === '') possibleMoves[0].push(squares[square.index + 2])

        } if (props.castling[3]) {

          if (squares[square.index - 1].piece === '' && squares[square.index - 2].piece === '') possibleMoves[0].push(squares[square.index - 2])

        }

      }

    }

    const moves = Moves.getLegalMoves(square, possibleMoves, squares, enPassant)

    if (square.piece && square.piece.id.charAt(1) === 'k') {

      if (moves[0].find(move => move.id === squares[square.index - 1].id) === undefined && moves[0].find(move => move.id === squares[square.index - 2].id) !== undefined) moves[0] = moves[0].filter(move => move.id !== squares[square.index - 2].id)
      if (moves[0].find(move => move.id === squares[square.index + 1].id) === undefined && moves[0].find(move => move.id === squares[square.index + 2].id) !== undefined) moves[0] = moves[0].filter(move => move.id !== squares[square.index + 2].id)

    }


    moves[0].forEach(move => {

      move.isPossibleMove = true

    })

    moves[1].forEach(move => {

      move.isPossibleCapture = true

    })

  }

  useEffect(() => {

    let FEN = Game.writeFEN(props.squares, props.currentPlayer, props.castling, props.enPassant, props.halfMoveClock, props.fullMoveNumber)
    // props.setFEN(FEN)
    props.setSquares(Game.readFEN(props.squares, FEN, props.setCurrentPlayer, props.setCastling, props.setEnPassant, props.setHalfMoveClock, props.setFullMoveNumber))
    console.log(FEN)

  }, [props.currentPlayer])

  const renderSquares = () => {

    return props.squares.map(({ id, index, isDark, piece, highlight, isPossibleMove, isPossibleCapture }) => {
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
          currentPlayer={props.currentPlayer}
          squares={props.squares}
          enPassant={props.enPassant}
          castling={props.castling}
          onBottom={props.onBottom}
          activeSquare={activeSquare}
          setCastling={props.setCastling}
          setEnPassant={props.setEnPassant}
          setHalfMoveClock={props.setHalfMoveClock}
          setFullMoveNumber={props.setFullMoveNumber}
          setActiveSquare={setActiveSquare}
          setSquares={props.setSquares}
          setCurrentPlayer={props.setCurrentPlayer}
          handleClick={showMoves}>
        </Square>
      )

    })

  }

  // useEffect(() => {

  //   // if (Game.checkForMate(props.squares, props.currentPlayer, props.enPassant, props.castling)) console.log("CheckMate!")
  //   // props.setFEN(Game.writeFEN(props.squares, props.currentPlayer, props.castling, props.enPassant, props.halfMoveClock, props.fullMoveNumber))
  //   console.log(props.FEN)

  // }, [props.currentPlayer])

  return (
    <div className='board' style={{ rotate: props.onBottom === 'w' ? '0deg' : '180deg' }} >
      {renderSquares()}
    </div>
  )
}

export default Board
