import { User } from "../interfaces/user.interface";
import { generatedUUIDv4 } from "../utils/uuidGenerator";

class UserImitationDB {
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

  public getUser(userId: string): User {
    return this.users.find(user => user.id === userId);
  }

  public getAutoSuggestUsers(
    loginSubstring: string,
    limit: { from: number; to: number }
  ): User[] {
    return this.users
      .filter(item => item.login.includes(loginSubstring))
      .sort((a, b) => (a.login > b.login ? -1 : 1))
      .slice(limit.from - 1, limit.to - 1);
  }

  public addUser(user: User): void {
    this.users.push(user);

    console.log('add', this.users);
  }

  public updateUser(user: User, userId: string): void {
    Object.assign(
      this.users.find(item => item.id === userId),
      user
    );

    console.log('update', this.users);
  }

  public deleteUser(userId: string): void {
    this.users.find(item => item.id === userId).isDeleted = true;

    console.log('delete', this.users);
  }

  public addDataForAddUser(user: User): User {
    user.id = generatedUUIDv4();
    user.isDeleted = false;
    return user;
  }
}

export const imitationDB = new UserImitationDB();
