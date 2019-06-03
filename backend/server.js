const express = require('express');
const app = express();
var socket = require('socket.io');
var bodyParser =  require("body-parser");
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
res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
next();
});

//Here we are configuring express to use body-parser as middle-ware.
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
 extended: false
}));
app.use(bodyParser.json());


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

//root
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


// Add saved post to user
app.post('/addpost', (req, res) => {

console.log("body:", req.body)

var userID = req.body.userid;
var postID = req.body.postid;
var type = req.body.type;
var name = req.body.name;

if(req.body.img){
 var image = decodeURIComponent(req.body.img);
}
else{
  var image = "";
}

  db.run(`INSERT INTO ${userID} VALUES(?,?,?,?)`, [postID, type, name, image],function(err) {

    if (err) {
      console.log(err.message)
        res.send("Error: Adding post to user failed! Message: " + err.message);
    }
    else{
      res.send("Added post: " + postID);
    }

  });
});


// Delete post from users saved posts
app.delete('/deletepost', (req, res) => {

  console.log("body:", req.body)
 
 var userID = req.body.userid;
 var postID = req.body.postid;
 
 db.run(`DELETE FROM ${userID} WHERE id=?`, postID, function(err) {
 
       if (err) {
          console.log(err.message)
           res.send("Error: Can't delete post:" + postID + " from user: "+ userID +"!");
       }
       else{
     
         res.send("Deleted post with ID: " + postID + "!");
 
       }
 
 });
 
 });

//Get all posts by userid
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




// close the database connection
/*DB.close((err) => {
if (err) {
  return console.error(err.message);
}
console.log('Close the database connection.');
});
*/




