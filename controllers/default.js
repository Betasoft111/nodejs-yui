/*
 * load required module
 */
var fs = require("fs"),
	file = "test.db",
	exists = fs.existsSync(file);

/*
 * load database configuration
 */
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

/*
 * create database table first
 */

db.serialize(function() {
	if (!exists) {
		db.run("CREATE TABLE Contacts(ID INTEGER PRIMARY KEY AUTOINCREMENT,NAME TEXT NOT NULL,Email TEXT NOT NULL,ADDRESS CHAR(50),PNumber INTEGER)");
	}
});

/*
 * default controller
 */
exports.index = function(req, res) {

	db.all("SELECT * FROM Contacts", function(err, row) {
		if (err) {
			console.log('Error loading the contacts ', err);
		}
		return res.render('index', {
			'title': 'Home Page',
			'contacts': row
		});

	});
}

/*
 * get add new page
 */
exports.getAddNew = function(req, res) {

	res.render('new', {
		'title': 'Add New Contact'
	});
}

/*
 * post new contact add in the database
 */
exports.postAddNew = function(req, res) {

	var name = req.body.name,
		email = req.body.email,
		address = req.body.address,
		phoneNumber = req.body.phoneNumber;


	var stmt = db.prepare("INSERT INTO Contacts VALUES (?,?,?,?,?)");
	stmt.run(null, name, email, address, phoneNumber);
	stmt.finalize(function(err, succees) {
		if (err) {
			res.redirect('/contacts/new');
		}
		res.redirect('/');
	});
}

/*
 * get edit contact page
 */
 exports.getEdit = function(req, res) {
 	var contactId = req.params.id;
 	db.each('SELECT ID,NAME,Email,Address,PNumber FROM Contacts WHERE ID = ?', contactId ,function (err, row) {
 		if(err) {
 			console.log('Error loading from database',err);
 		}

 		res.render('edit',{
	 		'title':'Update Contact Details',
	 		'contact': row
	 	});

	  });
 }

/*
 * update contact details in database
 */
 exports.postEdit = function(req, res) {
	var name = req.body.name,
		email = req.body.email,
		address = req.body.address,
		phoneNumber = req.body.phoneNumber,
		contactId = req.body.ID;


	db.run("UPDATE Contacts SET Name = ?, Email = ?,Address = ?, PNumber = ?  WHERE id = ?", [ name, email, address, phoneNumber, contactId ], function(err, succees){

		if(err) {
			console.log('Error updating contact', err);
		}
		res.redirect('/');
	});
 }