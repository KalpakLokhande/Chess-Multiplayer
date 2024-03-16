import React, { useState } from 'react'
import Board from './Board'
import EvalBar from './EvalBar'

const PlayComputer = () => {

    const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0')

    return (
        <div style={{ width: '100%', height: '100dvh', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', background: 'radial-gradient(#303030,black)' }} >
            <EvalBar FEN={FEN} ></EvalBar>
            <Board FEN={FEN} setFEN={setFEN} onBottom='w' ></Board>
        </div>
    )
}

export default PlayComputer
