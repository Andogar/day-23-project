const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

const application = express();

application.engine('mustache', mustache());
application.set('view engine', 'mustache');
application.set('views', './views');

application.use(bodyParser.urlencoded());

application.use('/public', express.static('./public'));

const todos = [ ]


application.get("/", function (request, response) {
  response.render('index', { todos: todos });
});

application.post("/", function (request, response) {
  var listItem = { task: request.body.todo, completed: false }
    todos.push(listItem)
    
    response.redirect('/');
})

application.put('/', (request, response) => {
  todos.find(function(todo) {
    if (todo.task == request.body.task) {
       todo.completed = true;
       return true;
    }
  })
  response.render('/', todos)
})

application.listen(3000);