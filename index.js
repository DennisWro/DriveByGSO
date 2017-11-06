var express = require('express'),
    app = express(),
    request = require('request'),
    bodyParser = require('body-parser'),
    loginFailedPage = '?state=loginFailed',
    loggedIn = false;

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function(req, res) {
    var isOk = req && req.body,
        acc = isOk && req.body['account'] ? req.body['account'] : "",
        pass =  isOk && req.body['password'] ? req.body['password'] : "";

        if(!(acc.length && pass.length)) {
          res.redirect(loginFailedPage);
        }

  request({
    uri: "https://www.koksa.org/ucp.php?mode=login",
    method: "POST",
    form: {
      username: acc,
      password: pass,
      login: "Anmelden"
    }
  }, function(error, response, body) {
    if(response && response.statusCode && (200 === response.statusCode)) {

      var loggedInMessage ="erfolgreich angemeldet";
          loggedIn = (body.indexOf(loggedInMessage) >= 0);
    }

    console.log("Nutzer ist eingeloggt: " + (loggedIn ? "JA" : "NEIN"));
    if(loggedIn) {
       res.redirect("main");
    } else {
      res.redirect('index');
    }

  });
});

app.get('/main', function(req, res) {
  if(loggedIn) {
      res.render('pages/main');
  } else {
      res.redirect('index');
  }
});

app.get('/index', function(request, response) {
  response.render('pages/index');
});

app.get('/', function(request, response) {
  response.render('pages/index');
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
