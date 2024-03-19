import React, { useEffect } from 'react'
import EvalBar from './EvalBar'
import Board from './Board'
import { useState } from 'react'
import puzzleList from './Puzzles.json'
import Game from './Game'

const Puzzles = () => {

    const [solvedPuzzles, setSolvedPuzzles] = useState(7)
    const [puzzleMoves, setPuzzleMoves] = useState(-2)
    const [FEN, setFEN] = useState('')
    const [botColor, setBotColor] = useState(null)
    const [currentPlayer, setCurrentPlayer] = useState(null)
    const [squares, setSquares] = useState(Game.getSquares())
    const [castling, setCastling] = useState([false, false, false, false])
    const [enPassant, setEnPassant] = useState(null)
    const [halfMoveClock, setHalfMoveClock] = useState(0)
    const [fullMoveNumber, setFullMoveNumber] = useState(1)
    const [movesList, setMovesList] = useState([])
    const [themes, setThemes] = useState([])

    // const [state,setState] = useState({
    //     solvedPuzzles : 0,
    //     puzzleMoves : -1,
    //     FEN : '',
    //     botColor : null,
    //     currentPlayer : null,
    //     squares : Game.getSquares(),
    //     castling : [false,false,false,false],
    //     enPassant : null,
    //     halfMoveClock : 0,
    //     fullMoveNumber : 1,
    //     movesList : [],
    //     themes : []
    // })

    // const { solvedPuzzles, puzzleMoves, FEN, botColor, currentPlayer, squares, castling, enPassant, halfMoveClock, fullMoveNumber, movesList } = state;

    const getBotColor = () => {

        let part = 0

        setSquares(Game.getSquares())
        setFEN(puzzleList.puzzles[solvedPuzzles].fen)
        setPuzzleMoves(prev => prev + 1)

        setSquares(Game.readFEN(Game.getSquares(), puzzleList.puzzles[solvedPuzzles].fen, setCurrentPlayer, setCastling, setEnPassant, setFullMoveNumber, setFullMoveNumber))

        for (let i = 0; i < puzzleList.puzzles[solvedPuzzles].fen.length; i++) {

            let char = puzzleList.puzzles[solvedPuzzles].fen[i]
            if (char === ' ') part += 1
            else if (part === 1) return char

        }

    }

    const next = () => {

        setSolvedPuzzles(prev => prev + 1)
        setPuzzleMoves(-2)
        setBotColor(getBotColor())

    }

    const reset = () => {

        setPuzzleMoves(-1)
        setBotColor(getBotColor())

    }

    useEffect(() => {

        setBotColor(getBotColor())

    }, [solvedPuzzles])

    useEffect(() => {

        if (botColor && botColor === currentPlayer && puzzleList.puzzles[solvedPuzzles].moves[puzzleMoves]) {
            
            setTimeout(() => {
                
                // setPuzzleMoves(prev => prev + 1)
                // setSquares(Game.readFEN(squares, FEN, setCurrentPlayer, setCastling, setEnPassant, setHalfMoveClock, setFullMoveNumber))
                let moveFrom = squares.find(square => square.id.toLowerCase() === puzzleList.puzzles[solvedPuzzles].moves[puzzleMoves].substring(0, 2))
                let moveTo = squares.find(square => square.id.toLowerCase() === puzzleList.puzzles[solvedPuzzles].moves[puzzleMoves].substring(2))
                console.log(moveFrom,moveTo)
                let temp = moveFrom.piece
                moveFrom.piece = ''
                moveTo.piece = temp
                setCurrentPlayer(botColor === 'w' ? 'b' : 'w')

            },500)

        } else {

            return
            
        }

    }, [ currentPlayer, solvedPuzzles])

useEffect(()=>{setPuzzleMoves(prev => prev + 1)},[currentPlayer])

    return (
        <div style={{ width: '100%', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', background: 'radial-gradient(#303030,black)' }} >
            {/* <div style={{ flexDirection: 'column', width: '20%', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }} >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox='0 0 100 100' width="120" height="120" fill="none"><path d="M77.4 13.64c-6.77 2.64-12.66 12.72-9.96 17.17.96 1.59 7.63 1.38 7.89 1.38 2.48 0 4.95-.77 6.84-2.32 1.89-1.55 2.83-3.57 2.83-5.6V15.1s-5.33-2.35-7.6-1.46zM37.21 18.98c-1.14.11-7.9 1.11-7.9 1.11v9.17c0 .91.44 1.84 1.32 2.57.58.48 1.31.79 2.1.93.53-.06 1.06-.1 1.6-.1 2.75 0 5.49.86 7.65 2.63.14.11.28.23.41.34 1.91 1.68 2.85 3.83 2.85 5.98l7.54-13.16c1.48-2.34-.11-10.94-15.58-9.47h.01z" fill="#DC501D" /><path d="M79.6 39.84S44.93 59.35 43.55 58.22l-29.1-20.85C7.38 36.3 5 40.97 5 40.97v9.17c0 1.48.69 2.96 2.07 4.09l32.83 26.9c1.38 1.13 3.19 1.7 5 1.7s3.62-.57 5-1.7l32.96-27c1.38-1.13 2.07-2.61 2.07-4.09v-9.17s-3.95-2.16-5.33-1.03z" fill="#DC501D" /><path d="M75.33 7.18c2.48 0 4.95.77 6.84 2.32 3.78 3.09 3.78 8.11 0 11.2-1.89 1.55-4.36 2.32-6.84 2.32-.26 0-.52 0-.79-.03-.1 0-.2-.01-.3-.01-.87 0-1.74.27-2.41.81-1.33 1.09-1.33 2.86 0 3.94l11.02 9.03c2.76 2.26 2.76 5.93 0 8.19l-32.96 27c-1.38 1.13-3.19 1.7-5 1.7s-3.62-.57-5-1.7L7.07 45.06c-2.76-2.26-2.76-5.93 0-8.19l8.51-6.98c.83-.68 1.92-1.02 3.01-1.02 1.09 0 2.18.34 3.01 1.02l1.01.83c.45.37.78.82.98 1.31-.08 2.36 1 4.74 3.23 6.52 2.21 1.81 4.95 2.67 7.7 2.67s5.6-.89 7.71-2.67c3.95-3.34 4.03-8.7.16-12.1-.13-.12-.27-.23-.41-.34-2.16-1.77-4.91-2.63-7.65-2.63-.53 0-1.07.03-1.6.1-.79-.14-1.52-.46-2.1-.93-1.75-1.44-1.75-3.64-.09-5.01l9.48-7.77c1.38-1.13 3.19-1.7 5-1.7s3.62.57 5 1.7l9.87 8.08c.66.54 1.54.82 2.41.82.87 0 1.74-.27 2.41-.82.74-.61 1.07-1.42.98-2.21-.22-2.24.71-4.54 2.8-6.25 1.89-1.55 4.36-2.32 6.84-2.32v.01z" fill="#FA742C" /><path d="M59.44 25.43c0-1.57-.08-3.12-.24-4.65-.37-.19-.73-.42-1.05-.69l-9.87-8.08c-.83-.68-2.02-1.07-3.25-1.07s-2.42.39-3.25 1.07l-9.48 7.77c-.16.13-.23.25-.23.31s.07.23.31.43c.14.11.32.21.53.28.47-.04.95-.06 1.42-.06 3.5 0 6.83 1.15 9.38 3.24.17.14.34.28.5.42 2.47 2.18 3.82 5.07 3.79 8.15-.03 3.1-1.45 5.98-3.99 8.13C41.47 42.82 38.1 44 34.53 44c-3.57 0-6.85-1.17-9.44-3.28-2.55-2.05-4.06-4.87-4.24-7.85l-1-.82c-.31-.25-.77-.4-1.27-.4s-.96.15-1.26.4l-8.51 6.98c-.68.56-1.06 1.26-1.06 1.96s.38 1.4 1.06 1.96l26.98 22.1c14.07-7.6 23.64-22.49 23.64-39.61l.01-.01z" fill="#FFA459" /></svg>
                <h1 style={{ color: 'aliceblue' }} >Puzzle</h1>
            </div> */}
            <EvalBar FEN={FEN} onBottom={botColor === 'w' ? 'b' : 'w'} ></EvalBar>
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
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '25%', height: '90dvh', borderRadius: '20px' }} >
                <h1 style={{ color: 'aliceblue' }} >{puzzleList.puzzles[solvedPuzzles].rating}</h1>
                <div style={{ width: '100%', height: '50%', gap: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                    <button onClick={() => reset()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'yellowGreen', border: 'none', borderRadius: '5px', backgroundColor: '#202020', padding: '12px 12px' }} ><img src={require('./Assets/reset.png')} ></img></button>
                    <button onClick={() => next()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'yellowGreen', border: 'none', borderRadius: '5px', backgroundColor: 'yellowGreen', padding: '12px 22px' }} ><img src={require('./Assets/right-arrow.png')} ></img></button>
                </div>
            </div>

        </div>
    )
}

export default Puzzles
