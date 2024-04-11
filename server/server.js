
import express from 'express';
import nodemailer from 'nodemailer';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';
import mysql from 'mysql2';
const app = express();



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
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection error:' + err);
        return;
    }
    console.log('connected to the Mysqldatabase');
    connection.release();
});

///login page authentication to check email and password exist in database or not
app.post('/formpage', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' });
    }

    pool.query('SELECT * FROM users WHERE email = ?', [email], (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }

        console.log('Query result:', results);

        if (results.length === 0) {
            // Email doesn't exist in the database
            return res.status(401).json({ error: 'Email not found' });
        } else {
            // Email exists, check if password matches
            const user = results[0];
            if (user.password !== password) {
                // Password is incorrect
                return res.status(401).json({ error: 'Password incorrect' });
            } else {
                // Both email and password are correct
                return res.status(200).json({ message: 'Login successfully' });
            }
        }
    });
});


///verify otp in database;
app.post('/verifyotp', (req, res) => {
    const { email, otp } = req.body;
    if (!otp) {
        return res.status(400).json({ error: 'OTP not provided' });
    }

    pool.query('SELECT * FROM users WHERE email = ? AND otp = ? ', [email, otp], (error, results, fields) => {
        if (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (results.length > 0) {
            return res.status(200).json({ message: 'Login successfully' });
        } else {
            return res.status(401).json({ error: 'Wrong OTP, please enter the correct one' });
        }
    });
});


/// update otp as null in database after timer end

app.put('/update-otp/:email', (req, res) => {
    const email = req.params.email;
  
    // Update OTP to null in the database
    const query = 'UPDATE users SET otp = null WHERE email = ?';
    pool.query(query, [email], (err, result) => {
      if (err) {
        console.error('Error updating OTP:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.status(200).json({ message: 'OTP updated successfully' });
    });
  });


//Register and add data into database
app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    console.log(req.body)
    pool.query('INSERT INTO users (email, name, password) VALUES (?, ?, ?)', [email, name, password], (error, results, fields) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: 'Internal Server error' });
        }
        console.log(results);
        console.log('User Register Successfully');
        res.status(200).json({ message: 'User register successfully' });

    });
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


/////abhishek server start
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "sslovess3030@gmail.com",
        pass: process.env.PASS,
    },
});
app.post('/sendotp', (req, res) => {
    const tomail = req.body.email;
    const data = req.body.otp;
    const option = {
        from: 'av67280@gmail.com',
        to: tomail,
        subject: 'OTP Verification',
        text: `"Your verification code is: ${data}. Please enter it to complete the testing process."`
    };

    transporter.sendMail(option, (err, info) => {
        if (err) {
            console.log(err); 
            res.status(500).send('Error sending email');
        } else {
            ///upadate otp in database
            pool.query('UPDATE users SET otp =  ? WHERE email= ?', [data, tomail],(error,results,fields) => {
                if (error) {
                    console.error('Error updating OTP: ' + error);
                    return res.status(500).json({ message: "Error updating OTP" });
                  }
                  if (results.affectedRows === 0) {
                    return res.status(404).json({ message: "User not found" });
                  }
                 // return res.status(200).json({ message: "OTP updated successfully" });
                  console.log('Email sent' + info.response);
                  res.status(200).send('Email Sent Successfully');
        
            });

           
        }
    });
});
// abhisghek server end



/// forget mail check
app.post('/forgetcheck', (req,res)=>{
    const email=req.body.email;

    pool.query('SELECT * FROM users WHERE email= ? ',[email],(error, results, fields)=>{
        if(error)
        {
            console.log("forget mail check error");
          return  res.status(500).send("forget maail check error 500");
        }
        
        if(results.length===0)
        {
          return  res.status(401).json({message: "forget mail not exist in database"});
        }
        console.log("forget mail check exist.");
       return res.status(200).json({message: "forget mail check found"});

    });

});
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on post localhost://${port}`);
}); 