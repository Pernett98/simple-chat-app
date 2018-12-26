'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Sequelize = _connection2.default.Sequelize;
var Op = Sequelize.Op;


var Conversation = _connection2.default.define('conversation', {});

Conversation.findOrCreateConversation = function (user1Id, user2Id) {

  var include = [_connection2.default.models.message];
  var order = [[_connection2.default.models.message, 'createdAt', 'DESC']];

  return Conversation.find({
    where: {
      user1Id: _defineProperty({}, Op.or, [user1Id, user2Id]),
      user2Id: _defineProperty({}, Op.or, [user1Id, user2Id])
    },
    include: include,
    order: order
  }).then(function (conversation) {
    if (conversation) {
      return conversation;
    } else {
      return Conversation.create({
        user1Id: user1Id,
        user2Id: user2Id
      }, {
        include: include,
        order: order
      });
    }
  });
};

exports.default = Conversation;