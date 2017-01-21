var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Define routes filesJS path
var index = require('./routes/index');
var todos = require('./routes/todos');
 
 //Init app
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
// Define / to index and api (any name I want!) path to get todos
app.use('/', index);
app.use('/api/v1/', todos);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
 
// tell server to listen in port 3000 
var server = app.listen(3000, function() {
    var host = 'localhost';
    var port = server.address().port;
    console.log('App listening at the awesome port of http://%s:%s', host, port);
});
 
module.exports = app;