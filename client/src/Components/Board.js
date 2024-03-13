import React, { useEffect, useState } from 'react'
import Square from './Square'
import Game from './Game'
import Moves from './Moves'

const Board = () => {

  // const [FEN, setFEN] = useState('r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R')
  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')

  const [squares, setSquares] = useState(Game.getSquares())
  const [activeSquare, setActiveSquare] = useState('')
  const [currentPlayer, setCurrentPlayer] = useState('w')
  const [enPassant, setEnPassant] = useState(null)
  const [castling, setCastling] = useState([true, true, true, true])


  const showMoves = (square, possibleMoves, enPassant) => {

    resetState()

    setActiveSquare(square)
    const updatedSquares = [...squares]

    updatedSquares.forEach((newSquare) => {

      if (newSquare.piece) {

        newSquare.highlight = (newSquare.id === square.id)

      }

    })

    if (square.piece && square.piece.id.charAt(1) === 'k') {

      if (square.piece.id.charAt(0) === 'w') {

        if (castling[0]) {

          if (squares[square.index + 1].piece === '' && squares[square.index + 2].piece === '') possibleMoves[0].push(squares[square.index + 2])

        } if (castling[1]) {

          if (squares[square.index - 1].piece === '' && squares[square.index - 2].piece === '') possibleMoves[0].push(squares[square.index - 2])

        }

      }

      if (square.piece.id.charAt(0) === 'b') {

        if (castling[2]) {

          if (squares[square.index + 1].piece === '' && squares[square.index + 2].piece === '') possibleMoves[0].push(squares[square.index + 2])

        } if (castling[3]) {

          if (squares[square.index - 1].piece === '' && squares[square.index - 2].piece === '') possibleMoves[0].push(squares[square.index - 2])

        }

      }

    }

    const moves = Moves.getLegalMoves(square, possibleMoves, squares, enPassant)

    if (square.piece && square.piece.id.charAt(1) === 'k') {

      console.log(moves[0], moves[0].find(move => move.id === squares[square.index + 1].id))
      if (moves[0].find(move => move.id === squares[square.index - 1].id) === undefined && moves[0].find(move => move.id === squares[square.index - 2].id) !== undefined) moves[0] = moves[0].filter(move => move.id !== squares[square.index - 2].id)
      if (moves[0].find(move => move.id === squares[square.index + 1].id) === undefined && moves[0].find(move => move.id === squares[square.index + 2].id) !== undefined) moves[0] = moves[0].filter(move => move.id !== squares[square.index + 2].id)
      console.log(moves[0])

    }


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

    if (activeSquare.piece.id.charAt(1) === 'p' && (activeSquare.id.charAt(1) === '2' || activeSquare.id.charAt(1) === '7') && (newSquare.id.charAt(1) === '4' || newSquare.id.charAt(1) === '5')) {

      if (activeSquare.id.charAt(1) === '2') setEnPassant({ square: squares[activeSquare.index - 8], originalSquare: squares[newSquare.index], piece: activeSquare.piece })
      if (activeSquare.id.charAt(1) === '7') setEnPassant({ square: squares[activeSquare.index + 8], originalSquare: squares[newSquare.index], piece: activeSquare.piece })

    } else {

      setEnPassant(null)

    }

    if (activeSquare.piece.id.charAt(1) === 'k') {

      if (activeSquare.piece.id.charAt(0) === 'w') {

        if (newSquare.id === squares[activeSquare.index + 2].id && castling[0]) {

          let rook = squares[activeSquare.index + 3].piece
          let king = activeSquare.piece
          squares[activeSquare.index + 3].piece = ''
          squares[activeSquare.index].piece = ''
          squares[newSquare.index].piece = king
          squares[activeSquare.index + 1].piece = rook


        }

        if (newSquare.id === squares[activeSquare.index - 2].id && castling[1]) {

          let rook = squares[activeSquare.index - 4].piece
          let king = activeSquare.piece
          console.log(king)
          squares[activeSquare.index - 4].piece = ''
          squares[activeSquare.index].piece = ''
          squares[newSquare.index].piece = king
          squares[activeSquare.index - 1].piece = rook
        }

      }

      if (activeSquare.piece.id.charAt(0) === 'b') {

        if (newSquare.id === squares[activeSquare.index + 2].id && castling[2]) {

          let rook = squares[activeSquare.index + 3].piece
          let king = activeSquare.piece
          squares[activeSquare.index + 3].piece = ''
          squares[activeSquare.index].piece = ''
          squares[newSquare.index].piece = king
          squares[activeSquare.index + 1].piece = rook


        }

        if (newSquare.id === squares[activeSquare.index - 2].id && castling[3]) {

          let rook = squares[activeSquare.index - 4].piece
          let king = activeSquare.piece
          console.log(king)
          squares[activeSquare.index - 4].piece = ''
          squares[activeSquare.index].piece = ''
          squares[newSquare.index].piece = king
          squares[activeSquare.index - 1].piece = rook
        }

      }

    }

    if (activeSquare.piece.firstMove === true) activeSquare.piece.firstMove = false

    setActiveSquare('')
    resetState()
    swapCurrentPlayer()
  }

  const capturePiece = (newSquare, enPassantCapture) => {

    let temp = activeSquare.piece
    if (enPassant && newSquare.id === enPassantCapture.square.id) {

      enPassant.square.piece = temp
      console.log(enPassant.originalSquare)
      enPassant.originalSquare.piece = ''
      squares[activeSquare.index].piece = ''

    } else {

      squares[newSquare.index].piece = temp
      squares[activeSquare.index].piece = ''

    }

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
          castling={castling}
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

    setCastling(Game.checkCastlingRights(squares, castling))
    if (Game.checkForMate(squares, currentPlayer, enPassant, castling)) console.log("CheckMate!")

  }, [currentPlayer])


  return (
    <div className='board' >
      {renderSquares()}
    </div>
  )
}

export default Board
