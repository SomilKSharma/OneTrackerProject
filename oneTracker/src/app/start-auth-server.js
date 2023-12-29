const jsonServer = require('json-server');
const auth = require('json-server-auth');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);

// Enable authentication
server.use(auth);
server.use(jsonServer.bodyParser);

// Custom routes for login and logout
server.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const user = router.db.get('users').find({ username, password }).value();
    console.log(user);

    if (user) {
        const token = generateAuthToken(user);
        res.json({ token });
        console.log(token);
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

server.post('/api/logout', (req, res) => {
    // Perform any logout logic here
    res.status(200).json({ message: 'Logout successful' });
});

server.use('/api', router);

const port = 3000;
server.listen(port, () => {
    console.log(`JSON Server with Auth is running on http://localhost:${port}`);
});

function generateAuthToken(user) {
    // Implement your own logic to generate an authentication token
    // For simplicity, you can use a library like jsonwebtoken
    const jwt = require('jsonwebtoken');
    const secretKey = 'your-secret-key'; // Replace with a secure secret key
    return jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
}
