import { IncomingMessage, ServerResponse } from 'http';
import UsersService from '../models';
import { getBody, getRespMessage, getRespData, getRespDataDelete } from '../utils';
import { IUser, IUsersWithId } from '../types';
import { CODES, MESSAGES } from '../constants';

export const getUsers = async (res: ServerResponse) => {
  try {
    await UsersService.GetUsers();
    return getRespData(res, UsersService.users, CODES.success200);
  } catch {
    return getRespMessage(res, MESSAGES.serverError, CODES.serverCode);
  }
};

export const getUser = async (res: ServerResponse, id: string) => {
  try {
    const user = await UsersService.GetUserById(id);
    if (user) {
      return getRespData(res, user, CODES.success200);
    } else {
      return getRespMessage(res, MESSAGES.userError, CODES.client404);
    }
  } catch {
    return getRespMessage(res, MESSAGES.serverError, CODES.serverCode);
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const u = await getBody(req);
    const { username, age, hobbies } = u ? u : { username: null, age: null, hobbies: null };
    if (u && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
      const user: IUsersWithId = { username, age, hobbies };
      const newUsers = await UsersService.CreateUser(user);
      return getRespData(res, newUsers, CODES.success201);
    } else {
      return getRespMessage(res, MESSAGES.fieldsReqErr, CODES.client400);
    }
  } catch {
    return getRespMessage(res, MESSAGES.serverError, CODES.serverCode);
  }
};

export const putUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {
    const user = await UsersService.GetUserById(id);
    const u = await getBody(req);
    const { username, age, hobbies } = u ? u : { username: null, age: null, hobbies: null };
    if (user) {
      if (u && typeof username === 'string' && typeof age === 'number' && Array.isArray(hobbies)) {
        const us: IUser = { id, username, age, hobbies };
        const newUsers = await UsersService.UpdateUser(us);
        return getRespData(res, newUsers, CODES.success200);
      } else {
        return getRespMessage(res, MESSAGES.badRequest, CODES.client404);
      }
    } else {
      return getRespMessage(res, MESSAGES.userError, CODES.client404);
    }
  } catch {
    return getRespMessage(res, MESSAGES.serverError, CODES.serverCode);
  }
};

export const deleteUser = async (res: ServerResponse, id: string) => {
  try {
    const user = await UsersService.GetUserById(id);
    if (user) {
      await UsersService.DeleteUser(id);
      return getRespDataDelete(res, CODES.success204);
    } else {
      return getRespMessage(res, MESSAGES.userError, CODES.client404);
    }
  } catch {
    return getRespMessage(res, MESSAGES.serverError, CODES.serverCode);
  }
};
