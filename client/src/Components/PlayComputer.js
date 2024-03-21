import React, { useEffect, useState } from 'react'
import Board from './Board'
import EvalBar from './EvalBar'
import Game from './Game'
import axios from 'axios'

const PlayComputer = () => {

    const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0')
    const [botColor, setBotColor] = useState('b')
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [squares, setSquares] = useState(Game.getSquares())
    const [castling, setCastling] = useState([false, false, false, false])
    const [enPassant, setEnPassant] = useState(null)
    const [halfMoveClock, setHalfMoveClock] = useState(0)
    const [fullMoveNumber, setFullMoveNumber] = useState(1)
    const [movesList, setMovesList] = useState([])


    useEffect(() => {

        setSquares(Game.readFEN(squares, FEN, setCurrentPlayer, setCastling, setEnPassant, setHalfMoveClock, setFullMoveNumber))

    }, [])

    const getBestMoves = async () => {

        try {

            const evaluation = await axios.get(`https://stockfish.online/api/s/v2.php?fen=${Game.writeFEN(squares, currentPlayer, castling, enPassant, halfMoveClock, fullMoveNumber)}&depth=5`)

            if (evaluation) {

                const movePattern = /\b[a-h][1-8][a-h][1-8]\b/g;
                const moves = evaluation.data.bestmove.match(movePattern);

                console.log(moves)
                let moveFrom = squares.find(square => square.id.toLowerCase() === moves[0].substring(0, 2))
                let moveTo = squares.find(square => square.id.toLowerCase() === moves[0].substring(2))

                let temp = moveFrom.piece
                moveFrom.piece = ''
                moveTo.piece = temp
                setCurrentPlayer(currentPlayer === 'b' ? 'w' : 'b')
                setFEN(Game.writeFEN(squares, currentPlayer, castling, enPassant, halfMoveClock, fullMoveNumber))
                console.log(FEN)
            }

        } catch (err) {

            console.log(err)

        }

    }

    useEffect(() => {

        setFEN(Game.writeFEN(squares, currentPlayer, castling, enPassant, halfMoveClock, fullMoveNumber))

        if (botColor === currentPlayer && FEN) {

            getBestMoves()

        } else {

            return
        }

    }, [currentPlayer])

    return (
        <div style={{ width: '100%', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', background: 'radial-gradient(#303030,black)' }} >
            {/* <EvalBar FEN={FEN} onBottom={botColor === 'w' ? 'b' : 'w'} ></EvalBar> */}
            <Board
                FEN={FEN} setFEN={setFEN}
                onBottom={botColor === 'w' ? 'b' : 'w'}
                setSquares={setSquares}
                squares={squares}
                setCurrentPlayer={setCurrentPlayer}
                currentPlayer={currentPlayer}
                castling={castling}
                setCastling={setCastling}
                enPassant={enPassant}
                setEnPassant={setEnPassant}
                halfMoveClock={halfMoveClock}
                setHalfMoveClock={setHalfMoveClock}
                fullMoveNumber={fullMoveNumber}
                setFullMoveNumber={setFullMoveNumber}
                playingAgainstBot={true}
                movesList={movesList}
                setMovesList={setMovesList}
            ></Board>
        </div>
    )
}

export default PlayComputer
