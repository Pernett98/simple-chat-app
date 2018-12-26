'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _http = require('http');

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var connection = _db2.default.connection,
    models = _db2.default.models;


var server = (0, _http.createServer)();
server.listen(process.env.SERVER_PORT || 3000);
var io = (0, _socket2.default)(server);

var Conversation = models.Conversation,
    User = models.User,
    Message = models.Message;


connection.sync({ logging: true, force: process.env.DB_FORCE || true });

var mobileSockets = {};

io.on('connection', function (socket) {

  socket.on('newUser', function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return handleNewUser.apply(undefined, [socket].concat(args));
  });
  socket.on('chat', function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return handleChat.apply(undefined, [socket].concat(args));
  });
  socket.on('message', function () {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return handleMessage.apply(undefined, [socket].concat(args));
  });
});

async function handleNewUser(socket, _ref) {
  var name = _ref.name,
      password = _ref.password;

  var where = {
    name: name,
    password: password
  };
  try {
    var _ref2 = await Promise.all([User.findOrCreate({
      where: where
    }), User.findAll()]),
        _ref3 = _slicedToArray(_ref2, 2),
        user = _ref3[0],
        users = _ref3[1];

    mobileSockets[user[0].id] = socket.id;
    socket.emit('userCreated', { user: user[0], users: users });
    socket.broadcast.emit('newUser', user[0]);
  } catch (error) {
    return handleError(error);
  }
}

async function handleChat(socket, users) {
  try {
    var conversation = await Conversation.findOrCreateConversation(users.user.id, users.receiver.id);
    socket.emit('priorMessages', conversation.messages);
  } catch (error) {
    return handleError(error);
  }
}

async function handleMessage(socket, _ref4) {
  var text = _ref4.text,
      sender = _ref4.sender,
      receiver = _ref4.receiver;

  try {
    var message = await Message.createMessage(text, sender, receiver);
    socket.emit('incomingMessage', message);
    var receiverSocketId = mobileSockets[receiver.id];
    socket.to(receiverSocketId).emit('incomingMessage', message);
  } catch (error) {
    return handleError(error);
  }
}

function handleError(error) {
  console.error(error);
  return Promise.reject(error);
}