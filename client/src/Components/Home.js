import React, { useState } from 'react'
import Board from './Board'
import EvalBar from './EvalBar'

const Home = () => {

  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

  return (
    <div className='App' style={{gap:'10px'}}>
      <EvalBar FEN={FEN} ></EvalBar>
      <Board FEN={FEN} setFEN={setFEN} ></Board>
    </div>
  )
}

export default Home
