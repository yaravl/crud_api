import 'dotenv/config';
import * as http from 'http';
import { uuidValidateV4, getRespMessage } from './utils';
import { getUsers, getUser, createUser, putUser, deleteUser } from './controllers';
import { CODES, MESSAGES } from './constants';

const PORT = process.env.PORT || 3000;
export const server = http.createServer((req, res) => {
  const url = req.url ? req.url.replace(/\/*$/g, '') : undefined;
  const isUser = url?.match(/\/api\/users\/([A-Za-z0-9])/);

  if (url === '/api/users' && req.method === 'GET') {
    return getUsers(res);
  } else if (url && url.split('/').length === 4 && isUser && req.method === 'GET') {
    const id = url.split('/')[3];
    if (uuidValidateV4(id)) {
      return getUser(res, id);
    } else {
      return getRespMessage(res, MESSAGES.userInvalidUuid, CODES.client400);
    }
  } else if (url === '/api/users' && req.method === 'POST') {
    return createUser(req, res);
  } else if (url && url.split('/').length === 4 && isUser && req.method === 'PUT') {
    const id = url.split('/')[3];
    if (uuidValidateV4(id)) {
      return putUser(req, res, id);
    } else {
      return getRespMessage(res, MESSAGES.userInvalidUuid, CODES.client400);
    }
  } else if (url && isUser && req.method === 'DELETE') {
    const id = url.split('/')[3];
    if (uuidValidateV4(id)) {
      return deleteUser(res, id);
    } else {
      return getRespMessage(res, MESSAGES.userInvalidUuid, CODES.client400);
    }
  } else {
    return getRespMessage(res, MESSAGES.routNotFound, CODES.client404);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
