
const express = require('express');
const app = express();

const sqlite3 = require('sqlite3');
//const db = new sqlite3.Database('got_db.db');
const DB_PATH = 'got_db';

// base url: http://192.168.10.212:8000/

const db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READWRITE, function(err){
  if (err) {
      console.log(err)
      return
  }
  console.log('Connected to ' + DB_PATH + ' database.')
});

// Server port
var HTTP_PORT = 8000;

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

// root
app.get('/', function (req, res){
  res.send('Welcome to the server :-)')
})

// Get all IDs in usercontent
app.get('/getIDs', (req, res) => {

  
  let query = `SELECT userid FROM usercontent`;

  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all(query, (err, rows) => {

        if (err) {
            res.send("no result!");//throw err;
        }
        else{
          
          console.log(rows);
          const allIDS = rows.map(e => e.userid);
          console.log(allIDS);
          res.send(allIDS);

        }
  
  });
});

// Get all names in usercontent
app.get('/getnames', (req, res) => {

  
  let query = `SELECT username FROM usercontent`;

  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all(query, (err, rows) => {

        if (err) {
            res.send("no result!");//throw err;
        }
        else{
          
          console.log(rows);
          const names = rows.map(e => e.username);
          console.log(names);
          res.send(names);

        }
  
  });
});


// close the database connection
/*DB.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});
*/
