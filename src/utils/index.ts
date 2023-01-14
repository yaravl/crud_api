import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';
import http, { ServerResponse } from 'http';
import { IUser } from '../types';

export const getRespData = (res: ServerResponse, user: IUser | IUser[], code: number) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(user));
};
export const getRespDataDelete = (res: ServerResponse, code: number) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  return res.end();
};

export const getRespMessage = (res: ServerResponse, message: string, code: number) => {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(message));
};

export const uuidValidateV4 = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const getBody = async (req: http.IncomingMessage): Promise<IUser | undefined> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      req.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          resolve(undefined);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};