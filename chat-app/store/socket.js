import io from 'socket.io-client'

const SERVER_URL = 'http://192.168.1.55:3000'
const socket = io(SERVER_URL)
socket.connect()
export default socket