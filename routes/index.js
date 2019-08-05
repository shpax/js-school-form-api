var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const { title } = req.query;
  res.render('index', { title });
});

module.exports = router;
