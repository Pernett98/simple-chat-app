import connection from './connection'
import Conversation from './models/conversation'
import Message from './models/message'
import User from './models/user'

User.hasMany(Conversation)
Conversation.belongsTo(User, { as: 'user1' })
Conversation.belongsTo(User, { as: 'user2' })
Message.belongsTo(Conversation)
Conversation.hasMany(Message)


export default { 
  connection,
  models: {
    Conversation,
    User,
    Message
  }
}
