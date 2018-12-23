import Sequelize from 'sequelize'
import debug from 'debug'

const debugF =  debug('chat-app:db')

const config = {
  database: process.env.DB_NAME || 'chat_app_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  setup: true,
  logging: m => debug(m)
}

const connection = new Sequelize(config)

export default connection