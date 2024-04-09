const express =require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const mysql = require('mysql2/promise');
const port = 8080;


app.use(cors());
// Midware to parse JSON bodies
app.use(bodyParser.json());
//mysql database connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'sharad@1234',
    database: 'db1'
};

//create a connection pool
const pool = mysql.createPool(dbConfig);

// test the database connection
pool.getConnection((err,connection)=>{
    if(err){
        console.error('Database connection error:' +err);
        return;
    }
    console.log('connected to the Mysqldatabase');
    connection.release();
});


// Post route for login
app.post('/formpage', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            // Email doesn't exist in the database
            return res.status(401).json({ error: 'Email not found' });
        } else {
            // Email exists, check if password matches
            if (rows[0].password !== password) {
                // Password is incorrect
                return res.status(401).json({ error: 'Password incorrect' });
            } else {
                // Both email and password are correct
                return res.status(200).json({ message: 'Login successfully' });
            }
        }
    } catch (error) {
        console.error('Error querying database:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


//111111111111111111111111111111111111111111111111111
//Define a get route 


// app.get('/api/users', (req,res)=>{
//     //fetch users from database
//     connection.query('select * from users ',(error,results)=>{
//         if(error){
//             console.error('Error fetching users from the database: ' + error.stack);
//             return res.status(500).json({error : 'Failed to fetch users'});
//         }
//         //send the fetched data as a a response
//         console.log('Fetched users from the database:', results);
//         res.json(results);
//     });
// });




// //22222222222222222222222222222222222222222222222222222222222222222222222222222222222222
// // Middleware to parse JSON in the request body
// app.use(express.json());

// // Define a POST route to add a new user
// app.post('/api/users', (req, res) => {
//     const { name } = req.body;
    
//     if (!name) {
//         return res.status(400).json({ error: 'Name is required' });
//     }

//   // Insert the new user into the database
//   connection.query('INSERT INTO users (name) VALUES (?)', [name], (error, results) => {
//       if (error) {
//           console.error('Error inserting user into the database: ' + error.stack);
//           return res.status(500).json({ error: 'Failed to insert user' });
//       }

//     // Send a success response
//     res.json({ message: 'User inserted successfully' });
//   });
// });




// //33333333333333333333333333333333333333333333333333333333333333333
// // Define a PUT route to update a user

// app.put('/api/users/:id', (req, res) => {
//     const userId = req.params.id;
//     const { name } = req.body;
    
//     if (!name) {
//         return res.status(400).json({ error: 'Name is required' });
//     }

//   // Update the user in the database
//   connection.query('UPDATE users SET name = ? WHERE id = ?', [name, userId], (error, results) => {
//       if (error) {
//           console.error('Error updating user in the database: ' + error.stack);
//           return res.status(500).json({ error: 'Failed to update user' });
//       }
      
//       if (results.affectedRows === 0) {
//           return res.status(404).json({ error: 'User not found' });
//       }

//     // Send a success response
//     res.json({ message: 'User updated successfully' });
//   });
// });



// //44444444444444444444444444444444444444444444444444444444
// // Define a DELETE route to delete a user

// app.delete('/api/users/:id', (req, res) => {
//     const userId = req.params.id;

//   // Delete the user from the database
//   connection.query('DELETE FROM users WHERE id = ?', [userId], (error, results) => {
//       if (error) {
//           console.error('Error deleting user from the database: ' + error.stack);
//           return res.status(500).json({ error: 'Failed to delete user' });
//       }
      
//       if (results.affectedRows === 0) {
//           return res.status(404).json({ error: 'User not found' });
//       }

//     // Send a success response
//     res.json({ message: 'User deleted successfully' });
//   });
// });
//Define the ApI routes
// app.get('/', (req,res)=>{
//     res.send('Hello World !');
// });

//start the server
app.listen(port,()=>{
    console.log(`Server is running on post localhost://${port}`);
});