/*
 * Load express
 */
var express = require('express'),
	app = express(),
	swig = require('swig'),
	bodyParser = require('body-parser');

var defaultController = require('./controllers/default');

/*
 * Set template engine
 */

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

/*
 * routing
 */
app.get('/', defaultController.index);
app.get('/contacts/new', defaultController.getAddNew);
app.post('/contacts/new', defaultController.postAddNew);
app.get('/contacts/edit/:id', defaultController.getEdit);
app.post('/contacts/edit/:id', defaultController.postEdit);

/*
 * Create node server
 */
var server = app.listen(process.env.PORT || 3000);

console.log('Example app listening at port', process.env.PORT || 3000);