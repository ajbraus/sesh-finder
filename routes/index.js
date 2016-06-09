var express = require('express');
var router = express.Router();
var Retreat = require('../models/retreat.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  d = new Date()
  
  Retreat.find({ "startsOn": { "$gte": d } })
         .sort('startsOn')
         .exec(function(err, retreats) {
    res.render('retreats-index', { retreats: retreats });  
  });
});

module.exports = router;
