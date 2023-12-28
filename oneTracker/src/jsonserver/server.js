const jsonServer = require('json-server');
const auth = require('json-server-auth');
const jsonwebtoken = require('jsonwebtoken');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.db = router.db;
server.use(auth);

server.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = server.db.get('users').find({ username, password }).value();

    if (user) {
        const token = jsonwebtoken.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
        res.jsonp({ token });
    } else {
        res.status(401).jsonp({ error: 'Invalid credentials' });
    }
});

server.use(middlewares);
server.use(router);

const port = 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on http://localhost:${port}`);
});
