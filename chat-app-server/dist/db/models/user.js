'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _connection = require('../connection');

var _connection2 = _interopRequireDefault(_connection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Sequelize = _connection2.default.Sequelize;


var User = _connection2.default.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING
});

exports.default = User;