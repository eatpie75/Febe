var User = require('../db').User;
var express = require('express');
var http = require('http');
var router = express.Router();

// home route
router.get('/', function(req, res){
  // access DB to retrieve all users
  res.send("Users");
});

router.get('/:id', function(req, res) {
  var id = Number(req.params.id);
  if (req.isAuthenticated() && req.user.id === id) return res.json(req.user);

  User.read(id).then(function(user) {
    res.json(User.clean(user));
  }, function() {
    res.status(400).send();
  });
});

router.post('/add', function(req, res){
  if (req.body.Test === 'test'){
    return res.send("Test done...");
  }
  // create test user
  User.create(req.body).then(function(user){
    console.log("User added");
  });
  // access DB to add a new user
  res.send('New User Added');
});

router.delete('/remove', function(req, res){
  // access DB to remove a user
  res.send('New User Added');
});

router.put('/update', function(req, res){
  // access DB to update a user
  res.send('New User Added');
});


module.exports = router;
