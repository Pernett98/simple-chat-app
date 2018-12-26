import { createServer } from 'http'
import SocketIO from 'socket.io'
import db from './db'

const { connection, models } = db 

const server = createServer()
server.listen(process.env.SERVER_PORT || 3000)
const io = SocketIO(server)

const { Conversation, User, Message } = models

connection.sync({ logging: true, force: process.env.DB_FORCE || true })

const mobileSockets = {}

io.on('connection', socket => {

  socket.on('newUser', (...args) => handleNewUser(socket, ...args))
  socket.on('chat', (...args) => handleChat(socket, ...args))
  socket.on('message', (...args) => handleMessage(socket, ...args))


})

async function handleNewUser(socket, { name, password }) {
  const where = {
    name,
    password
  }
  try {
    const [user, users] = await Promise.all([
      User.findOrCreate({
        where
      }),
      User.findAll()
    ])
    mobileSockets[user[0].id] = socket.id
    socket.emit('userCreated', { user: user[0], users })
    socket.broadcast.emit('newUser', user[0])
  } catch (error) {
    return handleError(error);
  }
}

async function handleChat(socket, users) {
  try {
    const conversation = await Conversation.findOrCreateConversation(users.user.id, users.receiver.id)
    socket.emit('priorMessages', conversation.messages)
  } catch (error) {
    return handleError(error);
  }
}

async function handleMessage(socket, { text, sender, receiver }) {
  try {
    const message = await Message.createMessage(text, sender, receiver)
    socket.emit('incomingMessage', message)
    const receiverSocketId = mobileSockets[receiver.id]
    socket.to(receiverSocketId).emit('incomingMessage', message)
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error) {
  console.error(error)
  return Promise.reject(error)
}