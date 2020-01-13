import {usersModels} from '../models/user.models';
import {User} from "../interfaces/user.interface";

export function getUserById(req, res): void {
  try {
    if (req.params && req.params.id) {
      let user = usersModels.getUser(req.params.id);
      res.send(JSON.stringify(user));
    }
  } catch (error) {
    res.send(error);
  }
}

export function getLimitUsers(req, res): void {
  try {
   if (req.query.from && req.query.to) {
      const loginSubstring: string = req.query.loginSubstring;
      const limit: { from: number; to: number } = {
        from: +req.query.from,
        to: +req.query.to
      };

      res.send(
        JSON.stringify(usersModels.getAutoSuggestUsers(loginSubstring, limit))
      );
    }
  } catch (error) {
    res.send(error);
  }
}

export function addUser(req, res): void {
  try {
    let user: User = usersModels.addDataForAddUser(req.body);
    usersModels.addUser(user);
    res.status(201).send(true);
  } catch (error) {
    res.send(error);
  }
}

export function updateUser(req, res): void {
  try {
    res.status(200).send(usersModels.updateUser(req.body, req.query.id));
  } catch (error) {
    res.send(error);
  }
}

export function deleteUser(req, res): void {
  try {
    usersModels.deleteUser(req.query.id);
    res.status(204).send();
  } catch (error) {
    res.send(error);
  }
}
