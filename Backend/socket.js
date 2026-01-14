const socketIo = require('socket.io')
const userModel = require('./models/user.model')
const captainModel = require('./models/captian.model')

let io

function intializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`)
        socket.on('join', async (data) => {
            const { userId, userType } = data
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                }) } else if (userType === 'captain') {
                await userModel.findByIdAndUpdate(userId, {
                    socketId: socket.id
                })


                socket.on('disconnect', () => {
                    console.log(`Client disconnected: ${socket.id}`)
                })
            }
        })
    })
}

function sendMessageToSocketId(socketId, message) {
    if (io) {
        io.to(socketId).emit('message', message)
    } else {
        console.log('Socket.io not intialized')
    }
}

module.exports = { intializeSocket, sendMessageToSocketId }