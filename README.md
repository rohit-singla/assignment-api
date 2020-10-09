# assignment-api
NodeJs Express api on a MongoDB database.
JWT used for authentication based on a token.

## Usage
* npm install
* node app.js
* Go to http://localhost:3000

* Go to url "/users/register" and register a user by providing 'name', 'email' and 'password' inside body.

* Authenticate the user to make use of the APIs by providing the registered email and password inside the body, url "/users/authenticate".

* Provide the token received through the response from authentication inside 'x-access-token' and use the services.

* User is able to see all his scheduled events not of other users.

## API paths
* /events/
* /events/:id
