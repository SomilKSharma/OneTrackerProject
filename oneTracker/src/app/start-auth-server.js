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

    if (user) {
        const token = generateAuthToken(user);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Custom route for getting a specific ticket by ID
server.get('/api/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    const ticket = router.db.get('tickets').find({ id: ticketId }).value();

    if (ticket) {
        res.json(ticket);
    } else {
        res.status(404).json({ error: 'Ticket not found' });
    }
});

// Custom route for updating a ticket
server.put('/api/tickets/:id', (req, res) => {
    const ticketId = parseInt(req.params.id);
    const updatedTicket = req.body;

    const existingTicketIndex = router.db
        .get('tickets')
        .findIndex((ticket) => ticket.id === ticketId)
        .value();

    if (existingTicketIndex !== -1) {
        router.db.get('tickets').splice(existingTicketIndex, 1, updatedTicket).write();
        res.json(updatedTicket);
    } else {
        res.status(404).json({ error: 'Ticket not found' });
    }
});

server.post('/api/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
});

// Custom route for getting all tickets
server.get('/api/tickets', (req, res) => {
    const tickets = router.db.get('tickets').value();
    res.json(tickets);
});

// Custom route for adding a ticket
server.post('/api/tickets', (req, res) => {
    const tickets = router.db.get('tickets').value();

    // Find the maximum ID
    const maxId = tickets.reduce((max, ticket) => (ticket.id > max ? ticket.id : max), 0);

    // Create a new ticket with an ID one more than the maximum
    const newTicket = {
        ...req.body,
        id: maxId + 1,
    };

    // Add the new ticket to the database
    router.db.get('tickets').push(newTicket).write();

    res.json({ title: 'Updated Ticket' });
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
