var express = require('express');
var router = express.Router();
var Retreat = require('../models/retreat.js')

/* NEW  */
router.get('/new', function(req, res, next) {
  res.render('retreats-new', { retreat: new Retreat() });
});

router.get('/edit/:id', function(req, res, next) {
  Retreat.findById(req.params.id).exec(function(err, retreat) {
    console.log(retreat)
    res.render('retreats-edit', { retreat: retreat });
  });
});

router.put('/:id', function(req, res, next) {
  Retreat.findById(req.params.id).exec(function(err, retreat) {
    req.body.startsOn = new Date(req.body.startsOnMonth + "-" + req.body.startsOnDay + "-" + req.body.startsOnYear);
    
    Retreat.findByIdAndUpdate(req.params.id, req.body, function(err, retreat) {
      res.redirect('/');
    });
  });
});

/* CREATE */
router.post('/', function(req, res, next) {
  req.body.price = req.body.price.replace('$', '');
  req.body.startsOn = new Date(req.body.startsOnMonth + "-" + req.body.startsOnDay + "-" + req.body.startsOnYear);
  
  var retreat = new Retreat(req.body);
  retreat.save(function(err, retreat) {
    if (err) { return console.log(err) }
    res.redirect('/');
  });
});

module.exports = router;
