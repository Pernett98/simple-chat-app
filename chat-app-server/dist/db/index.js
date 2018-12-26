'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('./connection');

var _connection2 = _interopRequireDefault(_connection);

var _conversation = require('./models/conversation');

var _conversation2 = _interopRequireDefault(_conversation);

var _message = require('./models/message');

var _message2 = _interopRequireDefault(_message);

var _user = require('./models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_user2.default.hasMany(_conversation2.default);
_conversation2.default.belongsTo(_user2.default, { as: 'user1' });
_conversation2.default.belongsTo(_user2.default, { as: 'user2' });
_message2.default.belongsTo(_conversation2.default);
_conversation2.default.hasMany(_message2.default);

exports.default = {
  connection: _connection2.default,
  models: {
    Conversation: _conversation2.default,
    User: _user2.default,
    Message: _message2.default
  }
};