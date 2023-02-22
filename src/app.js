import express from 'express';
import { Server } from 'socket.io';
import { __dirname } from './utils.js';
import './dbConfig.js'
import handlebars from 'express-handlebars'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import messagesRouter from './routes/messages.router.js'
import viewsRouter from './routes/views.router.js'
import { messagesModel } from './dao/models/messages.model.js';


const app = express()
const PORT = 8080


// Seteo de aplicacion
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))


// Rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/views', viewsRouter)


// Ruta raiz
app.get('/', (req, res) => {
    res.render('layouts/main')
})


// Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

// sockets
const mensajes = []

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${PORT} => http://localhost:8080`)
})

const socketServer = new Server(httpServer)

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`)

    socket.on('disconnect', () => {
        console.log('Usuario desconectado')
    })

    socket.on('mensaje', info => {
        mensajes.push(info)
        socketServer.emit('chat', mensajes)
        async function addMsg() {
            try {
                const newMsg = await messagesModel.create(info)
                return newMsg
            } catch (error) {
                console.log(error)
            }
        }
        addMsg()
        console.log(info)
    })

    socket.on('nuevoUsuario', usuario => {
        socket.broadcast.emit('broadcast', usuario)
    })
})














