# CRUD-API

### How to install app
- Select develop branch
- ```npm i```
### Scripts
- ```npm run start:dev``` -> The application is run in development mode
- ```npm run start:prod``` -> The application is run in production mode, starts the build process with typescript and then runs the linked file
- ```npm run build``` -> The application is run in production mode, starts the build process with webpack and then runs the linked file
- ```npm run start:multi``` -> Runs multiple instances of application using Cluster API equal to the number of logical processor cores
- ```npm run test``` -> Running tests.
### API

- **GET** `api/users` - to get all users
- **GET** `api/users/${userId}` to get all user by id
- **POST** `api/users` to create record about user and store it in `in-memory-database`
- **PUT** `api/users/{userId}` to update existing user(**`all fields should be required`**)
- **DELETE** `api/users/${userId}` to delete existing user from `in-memory-database`
### User`s required fields:
- username - user`s name (string, **required**)
- age - user`s age (number, **required**)
- hobbies - user`s hobbies (array of string or empty array, **required**)
#### example body request :
```{
    "username":"John",
    "age": 30,
    "hobbies": ["basketball"]
}
