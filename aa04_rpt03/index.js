var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/aa04', function (req,res,next){
	res.render('aa04',{title:'Express App',
                     id:'AA04',
                      name:'AKASIA'});
});

module.exports = router;
