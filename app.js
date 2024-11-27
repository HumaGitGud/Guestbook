// Get the express package + mariadb
const express = require('express');
const mariadb = require('mariadb');

// Instantiate an express (web) app + mariadb pool
const app = express();
const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123123',
    database: 'guestbook'
});

// Asynchronously wait for db connection
async function connect() {
    try {
        let conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error connecting to the databse');
    }
}

// Define a port number for the app to listen on
const PORT = 3000;

// Tell the app to encode data into JSON format
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Set your view (templating) engine to "EJS"
// (We use a templating engine to create dynamic web pages)
app.set('view engine', 'ejs');

// Define a "default" route, 
// e.g. jshmo.greenriverdev.com/reservation-app/
app.get('/', (req, res) => {
	// Log message to the server's console
	console.log("Hello world - server!");
    // Return home page
    res.render('home', {data: {}});
});

// Define a "confirm" route, using the POST method
app.post('/confirm', async (req, res) => {
    // Get the data from the form that was submitted
    // from the body of the request object
    const data = req.body;

    // Server-side validation (in case front-end is broken/bypassed)
    let isValid = true;
    if (data.fnameInput.trim() === '') {
        isValid = false;
    }
    if (data.lnameInput.trim() === '') {
        isValid = false;
    }
    if (data.howmeetInput === 'none') {
        isValid = false;
    }
    if (!isValid) {
        res.render("home", {data: data});
        return;
    }

    const conn = await connect();
    await conn.query(
        `INSERT INTO users (firstName, lastName, email, howmeet) VALUES (?, ?, ?, ?)`,
        [data.fnameInput, data.lnameInput, data.emailInput, data.howmeetInput]
    );
    
    // Display the confirm page, pass the data
    res.render('confirm', {data: data });
})

app.get('/entries', async (req, res) => {
    const conn = await connect();
    const rows = await conn.query('SELECT * FROM users;');
    res.render('entries', {data: rows});
});

// Tell the app to listen for requests on the designated port
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});