const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

const application = express();

application.engine('mustache', mustache());
application.set('view engine', 'mustache');
application.set('views', './views');

application.use(bodyParser.urlencoded());

application.use('/public', express.static('./public'));

const todos = [];
var id = 1;


application.get("/", function (request, response) {
  response.render('index', { todos: todos });
});

application.post("/", function (request, response) {
  if (!request.body.todo) {
    response.render('index', { todos: todos});
  } else {
    var listItem = { task: request.body.todo, completed: false, id: id++ }
    todos.push(listItem)

    response.redirect('/');
  }

});

application.post('/:id', (request, response) => {
  todos.find(function (todo) {
    if (todo.id == request.params.id) {
      todo.completed = true;
      return true;
    }
  })
  response.redirect('/');
});

application.listen(3000);

// need jsonfile and fs require(file-system)