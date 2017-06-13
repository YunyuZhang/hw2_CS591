const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/CS591')
const db = mongoose.connection
db.once('open', function () {
    console.log('Connection successful.')
})
const Schema = mongoose.Schema
const stringSchema = new Schema({
    string: String,
    length: Number

})
const input_string = mongoose.model('input_string', stringSchema)

// POST Create a new user
router.post('/', function(req, res, next) {
    if(req.body.string ===""){
        res.json("Please input a string")
    }
    else {
        findByName(req.body.string)
            .then(function (status) {

                res.json(status)
            })
            .catch(function (status) {
                let str_length = req.body.string.length;
                let aString = new input_string({string: req.body.string, length: str_length})
                aString.save()
                res.json(status)

            })
    }
})




//GET Fetch all users
router.get('/', function (req, res, next) {
    input_string.find({}, function (err, results) {
        res.json(results);
    })

})



router.get('/:name', function (req, res, next) {
    findByName(req.params.name)
        .then(function (status) {

            res.json(status)
        })
        .catch(function (status) {
            let aString= new input_string({string: req.params.name, length:req.params.name.length})
            aString.save()
            res.json(status)

        })
})

let findByName = function (checkName) {
    return new Promise(function (resolve, reject) {
        input_string.find({string: checkName}, function (err, results) {
            if (results.length > 0) {
                resolve({found: results})
            }
            else {
                reject({found: false})
            }
        })
    })
}






//DELETE Delete the specified user
router.delete('/:name', function (req, res, next) {
    console.log(req.params.name)
    findByName(req.params.name)
        .then(function (status) {
            input_string.findOneAndRemove({string: req.params.name}, function (err, result) {
                if (err) {
                    res.json({message: 'String not found'});
                }
                else {
                    res.json({message: 'success'});
                }
            })

            //res.json(status)
        })
        .catch(function (status) {

            res.json("String not found")

        })



});

module.exports = router;