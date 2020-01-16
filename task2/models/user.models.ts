import { User } from './../interfaces/user.interface';

import {generatedUUIDv4} from "../utils/uuidGenerator";
import { Sequelize, Model, INTEGER, STRING, BOOLEAN } from 'sequelize';

class UserModels {
  private DataBaseName: string = 'db';
  private UserName: string = 'postgres';
  private Login: string = 'Scherstyk25';

  private sequelize;

  public User;

  users: User[] = [
    {
      login: "asdasdasalex",
      password: "1111",
      age: 12,
      id: "693b9e13-1913-4115-a238-dc2a4571b221",
      isDeleted: false
    },
    {
      login: "aleandry",
      password: "4444",
      age: 13,
      id: "693b9e13-1913-4115-a238-dc2a4571b222",
      isDeleted: false
    },
    {
      login: "Dimaale",
      password: "2222",
      age: 14,
      id: "693b9e13-1913-4115-a238-dc2a4571b223",
      isDeleted: false
    },
    {
      login: "aleKolia",
      password: "3333",
      age: 15,
      id: "693b9e13-1913-4115-a238-dc2a4571b224",
      isDeleted: false
    },
    {
      login: "aleVlad",
      password: "4321",
      age: 16,
      id: "693b9e13-1913-4115-a238-dc2a4571b226",
      isDeleted: false
    },
    {
      login: "Sergei",
      password: "1234",
      age: 27,
      id: "693b9e13-1913-4115-a238-dc2a4571b225",
      isDeleted: false
    }
  ];

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
    return this.User.findAll({where:{login: { $like: `%${loginSubstring}%` }}, raw: true, offset: limit.from, limit: limit.to})
      .then(users => console.log(users))
      .catch(err => console.log(err));

    return this.users
      .filter(item => item.login.includes(loginSubstring))
      .sort((a, b) => (a.login > b.login ? -1 : 1))
      .slice(limit.from - 1, limit.to - 1);
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
