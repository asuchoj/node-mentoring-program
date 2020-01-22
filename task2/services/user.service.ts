import { User } from './../interfaces/user.interface';
import { generatedUUIDv4 } from "../utils/uuidGenerator";
import { Op } from 'sequelize';

export class UserService {
  private User;

  constructor(userModel) {
    this.User = userModel;
  }

  getUser(userId: string): Promise<User | null> {
    return this.User.findOne({where: {id: userId}})
      .then( user => {
          if(!user) return null;
          return user.dataValues;
      })
  }

  getAutoSuggest(loginSubstring: string, limit: { from: number; to: number }): Promise<User[]> {
    return this.User.findAll({
      where: {
        login: {
          [Op.like]: `%${loginSubstring}%`
        }
      }, 
      raw: true,
      offset: limit.from,
      limit: limit.to
    })
  }

  create(user: User): Promise<User> {
    return this.User.create({
      login: user.login,
      password: user.password,
      age: user.age,
      id: user.id,
      isdeleted: user.isDeleted
    })
    .then(user => user.dataValues);
  }

  update(user: User, userId: string): Promise<boolean> {
    return this.User.update({
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
    .then(() => true)
  }

  delete(userId: string): Promise<boolean> {
    return this.User.update({
      isdeleted: true
     }, {
      where: {
        id: userId
      }
    });
  }

  addDataForAddUser(user: User): User {
    user.id = generatedUUIDv4();
    user.isDeleted = false;
    return user;
  }
}
