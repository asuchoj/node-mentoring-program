import { User } from './../interfaces/user.interface';

import {generatedUUIDv4} from "../utils/uuidGenerator";
import { Sequelize, INTEGER, STRING, BOOLEAN, Op } from 'sequelize';

class UserModels {
  private DataBaseName: string = 'db';
  private UserName: string = 'postgres';
  private Login: string = 'Scherstyk25';

  private sequelize;

  public User;

  constructor() {
    this.sequelize = new Sequelize(this.DataBaseName, this.UserName, this.Login, {
      dialect: "postgres"
    });
  
    this.User = this.sequelize.define('user', {
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

    this.sequelize.sync()
      .then( result => console.log(1))
      .catch(err => console.log(2));
  }

  public getUser(userId: string): User | string {
    return this.User.findOne({where: {id: userId}})
      .then( user => {
          if(!user) return;
          console.log(user.dataValues);
      })
      .catch(err=>console.log(err));
  }

  public getAutoSuggestUsers(loginSubstring: string, limit: { from: number; to: number }): User[] {
    console.log(Op.like);

    return this.User.findAll({where: {login: {[Op.like]: `%${loginSubstring}%`}}, raw: true, offset: limit.from, limit: limit.to})
      .then(users => console.log(1111, users))
      .catch(err => console.log(err));
  }

  public addUser(user: User): void {
    this.User.create({
      login: user.login,
      password: user.password,
      age: user.age,
      id: user.id,
      isdeleted: user.isDeleted
    })
    .then(res => console.log('All is good'))
    .catch(err => console.log('somthing wrong'));
  }

  public updateUser(user: User, userId: string): void {
    this.User.update({
      login: user.login,
      password: user.password,
      age: user.age,
      id: user.id,
      isdeleted: user.isDeleted
     }, {
      where: {
        id: userId
      }
    })
    .then((res) => console.log(res))
    .catch(err => console.log(err));
  }

  public deleteUser(userId: string): void {
    this.User.update({
      isdeleted: true
     }, {
      where: {
        id: userId
      }
    })
    .then((res) => console.log(res))
    .catch(err => console.log(err));
  }

  public addDataForAddUser(user: User): User {
    user.id = generatedUUIDv4();
    user.isDeleted = false;
    return user;
  }
}

export const usersModels = new UserModels();
