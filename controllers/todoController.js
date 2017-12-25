// var data = [
//   {
//     item: 'Get Milk'
//   },{
//     item: 'Go to School'
//   },{
//     item: 'Listen to Music'
//   }
// ];

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//connect to database
mongoose.connect('mongodb://test:test@ds045734.mlab.com:45734/todo');

//create a schema -- a blueprint for the documents in the database
var todoSchema = new mongoose.Schema({
  item : String
});

//create a model for the documents
var Todo = mongoose.model('Todo', todoSchema);

/*var itemOne = Todo({item: 'Buy Flowers'}).save(function(err){
  if(err){
    throw err;
  }
  console.log('Item saved successfully');
})*/
var urlEncodedParser = bodyParser.urlencoded({extended: false});
module.exports = function(app){

  app.get('/todo', function(req, res){
    //get data from mongo db and pass it to view
    Todo.find({}, function(err, data){
      if(err){
        throw err;
      }
      res.render('todo', {data: data});
    });

  });

  app.post('/todo', urlEncodedParser, function(req, res){
    //get data from view and add it to mongo db
    var newTodo = Todo(req.body).save(function(err, data){
      if(err){
        throw err;
      }
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res){
    // delete the requested item from mongo db
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
      if(err){
        throw err;
      }
      res.json(data);
    });
  });
}
