const express = require('express');
const mustache = require('mustache-express');

// set our server object into a variable
const application = express();

// set an engine called "mustache" using our mustache() library
application.engine('mustache', mustache());

// set our view engine to use the mustache engine
application.set('view engine', 'mustache');

//set our views to the ./views directory
application.set('views', './views');

//uncomment this to "serve" your public folder
// app.use(express.static(__dirname + '/public'));

application.use('/', function(request, response){
   // basic send response
   response.send('heyy there');

   //uncomment this to verify mustache is working
   // response.render('index');
})

const port = 3000
application.listen(port, function(){
   //should see these console loggin in the terminal
   console.log("server is running!");
   console.log('listening at port: ', port);
})
