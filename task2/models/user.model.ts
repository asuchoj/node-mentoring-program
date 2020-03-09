import { Sequelize, INTEGER, STRING, BOOLEAN } from 'sequelize';

const sequelize = new Sequelize('db', 'postgres', 'Scherstyk25', {
  dialect: "postgres"
});

export const UserModel = sequelize.define('user', {
  login: {
    type: STRING,
    allowNull: false
  },
  password: {
    type: STRING,
    allowNull: false
  },
  age: {
    type: INTEGER,
    allowNull: false
  },
  id: {
    type: STRING,
    primaryKey: true,
    allowNull: false
  },
  isdeleted: {
    type: BOOLEAN,
    allowNull: false
  }
})