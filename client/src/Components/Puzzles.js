import React, { useEffect } from 'react'
import EvalBar from './EvalBar'
import Board from './Board'
import { useState } from 'react'
import puzzleList from './Puzzles.json'
import Game from './Game'

const Puzzles = () => {

    const [solvedPuzzles, setSolvedPuzzles] = useState(0)
    const [puzzleMoves, setPuzzleMoves] = useState(-1)
    const [FEN, setFEN] = useState(puzzleList.puzzles[solvedPuzzles].fen)
    const [botColor, setBotColor] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [squares,setSquares] = useState(Game.getSquares())

    const getBotColor = () => {

        let part = 0
        for (let i = 0; i < puzzleList.puzzles[solvedPuzzles].fen.length; i++) {

            let char = puzzleList.puzzles[solvedPuzzles].fen[i]

            if (char === ' ') part++
            if (part === 1 && char === 'w') return 'w';
            if (part === 1 && char === 'b') return 'b';

        }

    }

    useEffect(() => { setBotColor(getBotColor()) }, [])

    useEffect(() => {

        let part = 0
        setPuzzleMoves(prevPuzzleMoves => prevPuzzleMoves + 1)

        for (let i = 0; i < FEN.length; i++) {

            let char = FEN[i]

            if (char === ' ') part++
            if (part === 1 && char === 'w') setCurrentPlayer(char)
            if (part === 1 && char === 'b') setCurrentPlayer(char)

        }

        if (botColor !== null) {

            if (currentPlayer === botColor ) {

                setTimeout(() => {

                    let moveFrom = squares.find(square => square.id === puzzleList.puzzles[solvedPuzzles].moves[puzzleMoves].substring(0, 2).toUpperCase())
                    let moveTo = squares.find(square => square.id === puzzleList.puzzles[solvedPuzzles].moves[puzzleMoves].substring(2).toUpperCase())
    
                    console.log(puzzleList.puzzles[solvedPuzzles].moves[puzzleMoves])
                    let temp = moveFrom.piece
                    moveFrom.piece = ''
                    moveTo.piece = temp
                    setCurrentPlayer(currentPlayer === 'w' ? 'b' : 'w')
                    setFEN(Game.writeFEN(squares, currentPlayer === 'w' ? 'b' : 'w', '', '', '', ''))
                    
                },1000)
                
            } else {
                
                return
                
            }
            
        }

    }, [currentPlayer])

    return (
        <div style={{ width: '100%', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', background: 'radial-gradient(#303030,black)' }} >
            {/* <EvalBar FEN={FEN} onBottom={botColor === 'w' ? 'b' : 'w'} ></EvalBar> */}
            <Board FEN={FEN} setFEN={setFEN} onBottom={botColor === 'w' ? 'b' : 'w'} setSquares={setSquares} squares={squares} setCurrentPlayer={setCurrentPlayer} currentPlayer={currentPlayer} ></Board>
        </div>
    )
}

export default Puzzles
