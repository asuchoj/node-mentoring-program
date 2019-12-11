import { User } from './../interfaces/user.interface';
import { generatedUUIDv4 } from '../utils/uuidGenerator';

class UserImitationDB {
  users: User[] = [
    {
      login: 'alex',
      password: '1111',
      age: 27,
      id: '693b9e13-1913-4115-a238-dc2a4571b225',
      isDeleted: false
    }
  ];

  getUser(userId: string): User {
    return this.users.find(user => user.id === userId);
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  updateUser(user: User): void {
    Object.assign(this.users.find(item => item.id === user.id), user);
  }

  delete(userId: string): void {
    this.users = this.users.slice(this.users.findIndex(item => item.id === userId), 1);
  }

  addDataForAddUser(user: User): User {
    user.id = generatedUUIDv4();
    user.isDeleted = false; 
    return user;
  }
}

export const imitationDB = new UserImitationDB();
