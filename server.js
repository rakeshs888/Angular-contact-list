var express = require('express');
var app =express();
var mongojs= require('mongojs');
var db= mongojs('contactlist',['contactlist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
// app.get('/',function (req,res) {
// 	res.send("hello world");
// });

app.get('/contactlist',function(req,res){
	console.log("i received a request")
	db.contactlist.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});
	// person1={
	// 	name: "raz",
	// 	email: "raz@gmail.com",
	// 	number: "111-111-1111"
	// },
	// person2={
	// 	name: "ram",
	// 	email: "ram@gmail.com",
	// 	number: "111-111-1221"
	// },
	// person3={
	// 	name: "raki",
	// 	email: "raki@gmail.com",
	// 	number: "111-111-1331"
	// };
	// var contactlist= [person1, person2, person3];

	// res.json(contactlist);
});

app.post('/contactlist',function(req,res){
	console.log(req.body);
	db.contactlist.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

app.delete('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.get('/contactlist/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id= req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set:{name:req.body.name, email:req.body.email, number:req.body.number}},
		new: true},
		function(err,doc){
		res.json(doc);
	});
});

app.listen(3000);
console.log("Server is running at port 3000");