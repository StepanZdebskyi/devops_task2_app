// A simple Node.js backend application using the Express framework.

// Import the express library
const express = require('express');

// Create an instance of an Express application
const app = express();

// Define the port the server will run on.
// Use the environment variable PORT if it's set, otherwise default to 3000.
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// In-memory data store (as a simple replacement for a database)
let users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];
let nextUserId = 3;

// --- API Endpoints ---

// GET /
// A simple welcome message for the root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the simple Node.js backend app!');
});

// GET /api/users
// Returns the list of all users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET /api/users/:id
// Returns a single user by their ID
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found.');
    }
});

// POST /api/users
// Creates a new user
app.post('/api/users', (req, res) => {
    if (!req.body || !req.body.name) {
        return res.status(400).send('User name is required.');
    }

    const newUser = {
        id: nextUserId++,
        name: req.body.name
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/users/:id
// Updates an existing user's information
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).send('User not found.');
    }
    
    if (!req.body || !req.body.name) {
        return res.status(400).send('User name is required.');
    }

    user.name = req.body.name;
    res.json(user);
});

// DELETE /api/users/:id
// Deletes a user by their ID
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1);
        res.json(deletedUser[0]);
    } else {
        res.status(404).send('User not found.');
    }
});

// --- Server Start ---

// Start the server and listen for incoming connections on the specified port
const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Export the app and server for testing purposes
module.exports = { app, server, users };
