const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const Server = require('socket.io')
const CORS = require('cors')

const io = Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})

let games= []
let onlineUsers = []

io.on('connection', (socket) => {

    
    socket.on('joinLobby', (userID) => {
        
        onlineUsers.push({userID:userID, socket})

        if(onlineUsers.length > 1){
            
            const randomIndexes = Array.from({length:2},()=>Math.floor(Math.random() * onlineUsers.length))
            const [user1index,user2index] = randomIndexes

            const user1Socket = onlineUsers[user1index].socket
            const user2Socket = onlineUsers[user2index].socket

            const userID1 = onlineUsers[user1index].userID;
            const userID2 = onlineUsers[user2index].userID;

            onlineUsers = onlineUsers.filter((index) => index !== user1index && index !== user2index)

            const colors = ['b','w']
            const randomColorIndex1 = Math.floor(Math.random() * 2)
            const randomColorIndex2 = 1 - randomColorIndex1

            const user1Color = colors[randomColorIndex1]
            const user2Color = colors[randomColorIndex2]

            const roomId = `room_${userID}_${user2Socket.id}`; 

            const newGame = {
                roomId : roomId,
                player1 : {userID : userID1, user1Color},
                player2 : {userID : userID2, user2Color}
            }
            games.push(newGame)

            user1Socket.join(roomId)
            user1Socket.emit('roomCreated', { roomID: roomId, userID1, userID2, user1Color, user2Color});
            user2Socket.join(roomId)
            user2Socket.emit('roomCreated', { roomID: roomId, userID1, userID2, user1Color, user2Color});

            console.log(games)
            console.log(onlineUsers)


        }else{

            socket.emit('notEnoughPlayers', 'No Players Online')

        }
    })

    socket.on('disconnect',()=>{
        onlineUsers = onlineUsers.filter((player) => player.socket.id !== socket.id)
    })

    
    socket.on('sendFEN', ({ roomID, FEN, receiverID }) => {
        socket.to(roomID).emit('receiveFEN', { FEN: FEN, senderID: socket.id });
    });

})

server.listen(3001, () => console.log("Listening on 3001"))