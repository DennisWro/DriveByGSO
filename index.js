var express = require('express');
var app = express();
var request = require("request");
var $ = require("jquery");

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



app.post('/login', function(request, response) {
    request({
    uri: "http://www.cjihrig.com/development/php/hello_form.php",
    method: "POST",
    form: {
      name: "Bob"
    }
  }, function(error, response, body) {
    console.log(body);
  });
});



app.get('/', function(request, response) {
  response.render('pages/index');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
