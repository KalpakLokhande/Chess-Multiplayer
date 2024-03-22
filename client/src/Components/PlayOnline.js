import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useState } from 'react'
import Game from './Game.js'
import Board from './Board.js'
const socket = io('http://localhost:3001')

const PlayOnline = () => {

  const [FEN, setFEN] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  const [botColor, setBotColor] = useState(null)
  const [currentPlayer, setCurrentPlayer] = useState(null)
  const [squares, setSquares] = useState(Game.getSquares())
  const [castling, setCastling] = useState([false, false, false, false])
  const [enPassant, setEnPassant] = useState(null)
  const [halfMoveClock, setHalfMoveClock] = useState(0)
  const [fullMoveNumber, setFullMoveNumber] = useState(1)
  const [movesList, setMovesList] = useState([])
  const [player1, setPlayer1] = useState(null)
  const [player2, setPlayer2] = useState(null)
  const [roomID, setRoomID] = useState(null)

  const joinLobby = () => {

    socket.emit('joinLobby', { userID: sessionStorage.getItem('userName') })

  }

  socket.on('roomCreated', ({ roomID, userID1, userID2, user1Color, user2Color }) => {
    setPlayer1(userID1.userID)
    setPlayer2(userID2.userID)
    setRoomID(roomID)

    if (userID1.userID === sessionStorage.getItem('userName')) setBotColor(user1Color)
    if (userID2.userID === sessionStorage.getItem('userName')) setBotColor(user2Color)

  })

  socket.on('notEnoughPlayers', (text) => {
    console.log(text)
  })

  socket.on('receiveFEN', ({ FEN, senderID }) => {
    setFEN(FEN)
    setSquares(Game.readFEN(Game.getSquares(), FEN, setCurrentPlayer, setCastling, setEnPassant, setHalfMoveClock, setFullMoveNumber))
    console.log(FEN)
  })

  useEffect(() => {

    setSquares(Game.readFEN(Game.getSquares(), FEN, setCurrentPlayer, setCastling, setEnPassant, setHalfMoveClock, setFullMoveNumber))

  }, [])

  useEffect(() => {

    // setSquares(Game.readFEN(squares, FEN, setCurrentPlayer, setCastling, setEnPassant, setHalfMoveClock, setFullMoveNumber))
    // let FEN = Game.writeFEN(squares,currentPlayer,castling,enPassant,halfMoveClock,fullMoveNumber)
    if (player1 && player2) {

      let updatedFEN = (Game.writeFEN(squares, currentPlayer, castling, enPassant, halfMoveClock, fullMoveNumber))
      // setFEN(Game.writeFEN(squares,currentPlayer,castling,enPassant,halfMoveClock,fullMoveNumber))

      const otherPlayer = sessionStorage.getItem('userName') === player1 ? player2 : player1;
      socket.emit('sendFEN', { roomID: roomID, FEN: updatedFEN, receiver: otherPlayer })


    }

  }, [currentPlayer])

  return (
    <div style={{ gap: '20px', width: '100%', height: '100dvh', background: '#303030', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >

      <div style={{ width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

        <button onClick={() => joinLobby()} style={{ cursor: 'pointer', padding: '12px 22px', background: 'yellowGreen', borderRadius: '10px', border: 'none' }} >Join Lobby</button>
      </div>

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

      <div style={{ width: '20%', height: '100dvh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }} >
        <div style={{ width: '100%', margin: '20px 0px', padding: '20px', borderRadius: '5px', background: '#101010', color: 'aliceblue' }} > <p>{player1}</p> </div>
        <div style={{ width: '100%', margin: '20px 0px', padding: '20px', borderRadius: '5px', background: '#101010', color: 'aliceblue' }} > <p>{player2}</p> </div>
      </div>

    </div>
  )
}

export default PlayOnline
