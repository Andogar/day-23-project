const express = require('express');
const mustache = require('mustache-express');
const bodyParser = require('body-parser');

const application = express();

application.engine('mustache', mustache());
application.set('view engine', 'mustache');
application.set('views', './views');

application.use(bodyParser.urlencoded());

application.use('/public', express.static('./public'));

const todos = ['Wash the car']

application.get("/", function (request, response) {
  response.render('index', { todos: todos });
});

application.post("/", function (request, response) {
    todos.push(request.body.todo)
    response.redirect('/');
})

application.listen(3000);