import { User } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { UserModel } from "../models/user.model";

const userService = new UserService(UserModel);

export function getUserById(req, res): void {
  if (req.params && req.params.id) {
    userService.getUser(req.params.id)
      .then(user => res.send(JSON.stringify(user)))
      .catch(err => res.send(err))
  }
}

export function getLimitUsers(req, res): void {
  if (req.query.from && req.query.to) {
    const loginSubstring: string = req.query.loginSubstring;
    const limit: { from: number; to: number } = {
      from: +req.query.from,
      to: +req.query.to
    };

    userService.getAutoSuggest(loginSubstring, limit)
      .then(users => res.send(JSON.stringify(users)))
      .catch(err => res.send(err))
  }
}

export function addUser(req, res): void {
  let user: User = userService.addDataForAddUser(req.body);
  userService.create(user)
    .then(user => res.status(201).send(user))
    .catch(err => res.send(err))
}

export function updateUser(req, res): void {
  userService.update(req.body, req.query.id)
    .then(result => res.status(200).send(result))
    .catch(err => res.send(err))
}

export function deleteUser(req, res): void {
  userService.delete(req.query.id)
    .then(() => res.status(204).send())
    .catch(err => res.send(err))
}