import connection from '../connection'

const { Sequelize } = connection
const { Op } = Sequelize

const Conversation = connection.define('conversation', {

});

Conversation.findOrCreateConversation = function (user1Id, user2Id) {

  const include = [connection.models.message]
  const order = [[connection.models.message, 'createdAt', 'DESC']]

  return Conversation.find({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    },
    include,
    order
  })
  .then(conversation => {
    if (conversation) {
      return conversation
    } else {
      return Conversation.create({
        user1Id,
        user2Id,
      }, {
        include,
        order
      })
    }
  })

}

export default Conversation