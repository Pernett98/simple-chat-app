import connection from '../connection'

const { Sequelize } = connection

const User = connection.define('user', {
  name: Sequelize.STRING,
  password: Sequelize.STRING
});

export default User;