const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const jsonFile = require('jsonfile');
const todos = require('./public/tasks.json');
const filePath = './public/tasks.json';
const fs = require('file-system');

const application = express();

application.engine('mustache', mustache());
application.set('view engine', 'mustache');
application.set('views', './views');

application.use(bodyParser.urlencoded());

application.use('/public', express.static('./public'));

var id = 1;


application.get("/", function (request, response) {
  response.render('index', { todos: todos });
});

application.post("/", function (request, response) {
  if (!request.body.todo) {
    response.render('index', { todos: todos });
  } else {
    var listItem = { task: request.body.todo, completed: false, id: id++ }
    todos.push(listItem)

    response.redirect('/');
  }
  todosJSON = JSON.stringify(todos);
  fs.writeFile(filePath, todosJSON, function (err) { })
  response.redirect('/');
});

application.post('/:id', (request, response) => {
  todos.find(function (todo) {
    if (todo.id == request.params.id) {
      todo.completed = true;
    }
  })
  todosJSON = JSON.stringify(todos);
  fs.writeFile(filePath, todosJSON, function (err) { })
  response.redirect('/');
});

application.listen(3000);