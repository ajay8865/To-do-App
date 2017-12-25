var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();
var log = function(msg){
  console.log(msg);
}

//fire controller
todoController(app);

//set template engine
app.set('view engine', 'ejs');

//configure static files
app.use(express.static('./public'));

//listen to port
var port = process.env.PORT || 3000;
app.listen(port, function(){
  log('Server listening on port: ' + port);
});
