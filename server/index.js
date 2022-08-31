import express from 'express'
import morgan from 'morgan'
import { Server as SockerServer } from 'socket.io'
import http from 'http'
import cors from 'cors'
import { PORT } from './config.js' //si vamos a tarer nuestros propios modulos tienes que llear la extension .js

const app = express()
const server = http.createServer(app)
const io = new SockerServer(server, {
    cors: {
        origin: '*' // para que se conecte cualquier servidor
    }
})

app.use(cors)
app.use(morgan('dev'))

io.on('connection', (socket) => {
    console.log(socket.id)

    socket.on('message', (message) => {
        console.log(message)
        socket.broadcast.emit('message', message)
    })
})

server.listen(PORT)
console.log('server on port ' + PORT)