import connection from '../connection'

const { Sequelize } = connection

const Message = connection.define('user', {
  text: Sequelize.STRING,
  user: Sequelize.JSON,
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  }
})

Message.createMessage = (text, sender, receiver) => {
  const record = {
    text,
    user: {
      _id: sender.id,
      name: sender.name
    }
  }

  return Promise.all([
    Message.create(record),
    connection.models.conversation.findOrCreateConversation
  ])
  .then(([message, conversation]) => message.setConversation(conversation))
}

export default Message