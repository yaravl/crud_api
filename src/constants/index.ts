export enum CODES {
  success200 = 200,
  success201 = 201,
  success204 = 204,
  serverCode = 500,
  client400 = 400,
  client404 = 404
}

export const MESSAGES = {
  serverError: 'Server is not responding',
  userError: 'User Not Found',
  userInvalidUuid: 'User id not valid',
  badRequest: 'Bad request',
  fieldsReqErr: 'Request not valid',
  routNotFound: 'Rout Not Found'
};
