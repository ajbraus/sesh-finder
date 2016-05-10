var express = require('express');
var router = express.Router();
var Retreat = require('../models/retreat.js')

/* NEW  */
router.get('/new', function(req, res, next) {
  res.render('retreats-new');
});

/* CREATE */
router.post('/', function(req, res, next) {
  var retreat = new Retreat(req.body);
  retreat.save(function(err, retreat) {
    if (err) { return console.log(err) }
    res.redirect('/');
  });
});

module.exports = router;
