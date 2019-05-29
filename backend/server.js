
const express = require('express');
const app = express();
var socket = require('socket.io');

const sqlite3 = require('sqlite3');
//const db = new sqlite3.Database('got_db.db');
const DB_PATH = 'got_db';

/*
app base url lan: http://192.168.10.212:8000/
app base url wan: 83.227.100.168:42132
rasppi base url wan: 83.227.100.168:42133
*/

//Enable cross origin resource sharing
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "application/json; charset=utf-8");
  next();
});

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
var server = app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

//Initialize socket.io
var io = socket(server);

io.on('connection', function(socket){

      console.log("Made socket connection")
      
      socket.on('create_socket', function(data){
          
          console.log(data);

          let query = `SELECT * FROM feed`;

          db.all(query, (err, result) => {

            if (err) {
               throw err;
               console.log("Error when fetching msgs")
            }
            else{
              console.log('fetched msgs');
              socket.emit('fetch msgs', result);
            }
  
      });


        socket.emit('fetch msgs', )
      });

      //Here we listen on a new namespace called "incoming data"
      socket.on("incoming message", (data)=>{

        console.log(data);

        var name = data.name;
        var date = data.date;
        var content = data.content;

        var query = `INSERT INTO feed (name, content, date) VALUES ("${name}", "${content}", "${date}")`;
        
        db.all(query, (err, result) => {

          if (err) {
            throw err;
            console.log("Error: New message failed");
          }
          else{
            console.log("New message posted: ", data);
            io.emit('message from server', data);
          }

        });

     
    });


      //A special namespace "disconnect" for when a client disconnects
      socket.on("disconnect", () => console.log("Client disconnected"));

});

// root
app.get('/', function (req, res){
  res.send('Welcome to the server :-)')
})


// create a new user table by userid from firebase
app.get('/adduser/:id', (req, res) => {

  var userID = req.params.id;
  console.log("userID: ", userID);


  let query = `CREATE TABLE ${userID} (id TEXT, type TEXT, name TEXT, image VARCHAR(255))`;


    db.all(query, (err, rows) => {

        if (err) {
            res.send("Error occurred when adding user");//throw err;
        }
        else{
          res.send("Added user: "+userID);
        }

  });
});

app.get('/adduser/:id', (req, res) => {

  var userID = req.params.id;
  console.log("userID: ", userID);


  let query = `CREATE TABLE ${userID} (id TEXT, type TEXT, name TEXT, image VARCHAR(255))`;


    db.all(query, (err, rows) => {

        if (err) {
            res.send("Error occurred when adding user");//throw err;
        }
        else{
          res.send("Added user: "+userID);
        }

  });
});



// Add saved post to user
app.get('/addpost/:userid/:postid/:type/:name/:img', (req, res) => {

  var userID = req.params.userid;
  var postID = req.params.postid;
  var type = req.params.type;
  var name = req.params.name;
  var image = decodeURIComponent(req.params.img);

  console.log("image", image);

    var query = `INSERT INTO ${userID} (id, type, name, image) VALUES ( "${postID}", "${type}", "${name}", "${image}")`;
    
    db.all(query, (err, rows) => {

      if (err) {
          res.send("Error: Adding post to user failed!");//throw err;
      }
      else{
        res.send("Added post: " + postID);
      }

    });
  
});

// Get all posts by userid
app.get('/getposts/:userid', (req, res) => {

  var userID = req.params.userid;

  let query = `SELECT * FROM ${userID}`;

  // db.all() fetches all results from an SQL query into the 'rows' variable:
  db.all(query, (err, rows) => {

        if (err) {
            res.send("Error: Can't get posts from user " + userID +"!");//throw err;
        }
        else{

          rows.forEach(function (row) {  
            console.log(row.id, row.type); 
          });
        
          res.send(rows);

        }

  });
  
});


// Delete post from users saved posts
app.get('/deletepost/:userid/:postid', (req, res) => {

  var userID = req.params.userid;
  var postID = req.params.postid;
 
  let query = `DELETE FROM ${userID} WHERE id= '${postID}'`;

  db.all(query, (err, rows) => {

        if (err) {
            res.send("Error: Can't delete post:" + postID + " from user: "+ userID +"!");//throw err;
        }
        else{
        
          res.send("Deleted post with ID: " + postID + "!");

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
