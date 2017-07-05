const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const cors = require('cors')
app.use(cors())

var desenhos = []

io.on('connection', function(socket) {
    socket.on('room', function(data) {
        desenhos.push(data)
        console.log(data)
        socket.broadcast.emit('draw', data)
    })
});

app.get('/', (req, res) => {
    return res.json(desenhos)
})


server.listen(3000)
