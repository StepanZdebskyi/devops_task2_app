Simple Node.js Backend App
This is a basic backend application built with Node.js and the Express framework. It provides several RESTful endpoints to manage a list of users.

Prerequisites
Node.js (which includes npm) installed on your machine.

Getting Started
Follow these steps to get the application running on your local machine.

1. Install Dependencies
Navigate to the project directory in your terminal and run the following command to install the required express package and the testing libraries (mocha, chai, supertest):

npm install

2. Start the Server
Once the dependencies are installed, you can start the server with this command:

npm start

You should see a confirmation message in your terminal:
Server is running on http://localhost:3000

3. Running the Tests
The project is configured with Mocha and Chai for unit testing.

To run the tests, you can stop the server (Ctrl+C) and run the following command in your terminal. The test runner will start and stop the server automatically.

npm test

This command will execute the test file (test/api.test.js), which sends requests to each of your API endpoints and verifies that they behave as expected.

4. Using the API Endpoints Manually
You can also interact with the API using a tool like curl or an API client like Postman or Insomnia. The server must be running (npm start).

GET /: Get a welcome message.

curl http://localhost:3000/

GET /api/users: Get the list of all users.

curl http://localhost:3000/api/users

GET /api/users/:id: Get a specific user by their ID.

curl http://localhost:3000/api/users/1

POST /api/users: Create a new user.

curl -X POST -H "Content-Type: application/json" -d '{"name":"Charlie"}' http://localhost:3000/api/users

PUT /api/users/:id: Update an existing user.

curl -X PUT -H "Content-Type: application/json" -d '{"name":"Alice Updated"}' http://localhost:3000/api/users/1

DELETE /api/users/:id: Delete a user.

curl -X DELETE http://localhost:3000/api/users/2