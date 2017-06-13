var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/', function (req, res, next) {
    //One way to access the params is on the req.query object
    console.log("req.query: ", req.query.p1, req.query.p2)
    //send back what was received
    res.json(req.query)
})



router.get('/[a-z].*/', function (req, res, next) {
    console.log("matched regexp")
    res.send("matched regexp", req.originalUrl)
});

module.exports = router;
