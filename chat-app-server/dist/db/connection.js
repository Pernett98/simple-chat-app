'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debugF = (0, _debug2.default)('chat-app:db');

var config = {
  database: process.env.DB_NAME || 'chat_app_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
  setup: true,
  logging: function logging(m) {
    return debugF(m);
  }
};

var connection = new _sequelize2.default(config);

exports.default = connection;