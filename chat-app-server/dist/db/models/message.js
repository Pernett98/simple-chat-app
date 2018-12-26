'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _connection = require('../connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = _connection2.default.Sequelize;


var Message = _connection2.default.define('message', {
  text: Sequelize.STRING,
  user: Sequelize.JSON,
  _id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  }
});

Message.createMessage = function (text, sender, receiver) {
  var record = {
    text: text,
    user: {
      _id: sender.id,
      name: sender.name
    }
  };

  return Promise.all([Message.create(record), _connection2.default.models.conversation.findOrCreateConversation(sender.id, receiver.id)]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        message = _ref2[0],
        conversation = _ref2[1];

    return message.setConversation(conversation);
  }).catch(console.error);
};

exports.default = Message;